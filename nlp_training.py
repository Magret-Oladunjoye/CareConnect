import string
import nltk
import numpy as np
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.pipeline import Pipeline
from sklearn.base import BaseEstimator, TransformerMixin
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.pipeline import Pipeline
from sklearn.metrics.pairwise import linear_kernel
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
import spacy

nlp = spacy.load("en_core_web_sm")


condition_specialty_mapping = {
    "cancer": "onco",
    "leukemia": "hematology",
    "diabetes": "endocrinology",
    "arthritis": "rheumatology",
    "asthma": "pulmonology",
    "hypertension": "cardiology",
    "migraine": "neurology",
    "depression": "psychiatry",
    "heart disease": "cardiology",
    "stroke": "neurology",
    "kidney disease": "nephrology",
    "liver disease": "hepatology",
    "digestive disorders": "gastroenterology",
    "thyroid disorders": "endocrinology",
    "lung disease": "pulmonology",
    "skin conditions": "dermatology",
    "bone fractures": "orthopedics",
    "eye diseases": "ophthalmology",
    "ear infections": "otolaryngology",
    "allergies": "allergy and immunology",
    "autoimmune diseases": "rheumatology",
    "infectious diseases": "infectious disease",
    "sexual health": "urology",
    "pregnancy": "obstetrics and gynecology",
    "child": "pedia",
    "cosmetic": "plastic",
    "plastic surgeon": "plastic surgeon",
    "mole": "plastic, cosmetic ",
   
    # Add more condition-specialty mappings as needed
}


def preprocess_text(text):
    lemmatizer = WordNetLemmatizer()
    stopwords_set = set(stopwords.words('english'))

    # Tokenization
    tokens = nltk.word_tokenize(text)

    # Remove punctuation and convert to lowercase
    tokens = [token.lower() for token in tokens if token not in string.punctuation]

    # Remove stopwords and lemmatize tokens
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stopwords_set]

    # Named Entity Recognition
    doc = nlp(' '.join(tokens))
    entities = [ent.text for ent in doc.ents]

    # Add named entities back to tokens
    tokens += entities

    # Join tokens back to form preprocessed text
    preprocessed_text = ' '.join(tokens)

    return preprocessed_text

def train_nlp_algorithm(processed_data):
    if not processed_data:
        raise ValueError("No valid documents found for training")

    vectorizer = TfidfVectorizer(stop_words="english")

    features = vectorizer.fit_transform(processed_data)

    # Compute the cosine similarity matrix
    cosine_sim = linear_kernel(features, features)

    model = {
        "vectorizer": vectorizer,
        "features": features,
        "cosine_sim": cosine_sim
    }

    return model

def recommend_doctors(search_history, model, doctors, condition_specialty_mapping):
    # Process each search history item
    processed_search_histories = [preprocess_text(sh) for sh in search_history]

    # Vectorize each processed search history and store their features
    search_features_list = [model['vectorizer'].transform([psh]) for psh in processed_search_histories]
    # Compute similarities between each search history and doctors
    sim_scores_list = [linear_kernel(sf, model['features']).flatten() for sf in search_features_list]

    # Flatten the list of similarity scores
    sim_scores = [score for sublist in sim_scores_list for score in sublist]

    # Get the indices of doctors sorted by their similarity scores
    indices = np.array(sim_scores).argsort()[::-1]

    # Get the indices that correspond to doctors
    doctor_indices = [i for i in indices if i < len(doctors)]

    # Get the top 10 most similar doctors
    num_doctors = min(10, len(doctors))
    top_doctors = [doctors[i] for i in doctor_indices[:num_doctors]]

    # Extract medical conditions from search history
    medical_conditions = set()
    for sh in processed_search_histories:
        for condition in condition_specialty_mapping.keys():
            if condition in sh:
                medical_conditions.add(condition)

    print("Medical Conditions:", medical_conditions)

    # Filter top doctors based on keywords in relevant fields
    recommended_doctors = []
    for doctor in top_doctors:
        for condition in medical_conditions:
            specialty = condition_specialty_mapping.get(condition)
            if (
                specialty and
                (
                    specialty.lower() in doctor.Specialty.lower() or
                    specialty.lower() in doctor.About.lower() or
                    specialty.lower() in doctor.Treatments_Offered.lower() or
                    specialty.lower() in doctor.Special_Interests.lower()
                )
            ):
                recommended_doctors.append(doctor)
                break

    return recommended_doctors
