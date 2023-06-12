#create website routes for our websites where users can go to, except login 

from flask import Blueprint, render_template, jsonify, json, request #define that this file is a blueprint of our app
from database.db import get_db
from urllib.parse import unquote
from models import Users
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, verify_jwt_in_request
from nlp_training import preprocess_text, train_nlp_algorithm, recommend_doctors as recommend_func, condition_specialty_mapping


views = Blueprint('views', __name__)
search_bp = Blueprint('search', __name__, url_prefix='/search')
#now that we have these blurptints defined, we need to register them in our __init__,py

@views.route('/')
def index():
    return render_template('index.html')


@views.route('/search_name', methods = ['GET', 'POST'])
def search_name():
    if request.method == 'POST':
        name_term = request.form['name_term']
        db = get_db()
        cursor = db.cursor()
        name_query = """
            SELECT * FROM Doctors
            WHERE Name LIKE %s
        """

        cursor.execute(name_query, ('%' + name_term + '%',))
        results = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        results_list = [dict(zip(columns, row)) for row in results]
    
   # Return the results as JSON
        return jsonify(results_list)

    # If the request method is GET, return an empty JSON array
    return jsonify([])


@views.route('/search_location', methods=['GET', 'POST'])
def search_location():
    if request.method == 'POST':
        location_term = request.form['location_term']
        db = get_db()
        cursor = db.cursor()
        location_query ="""
            SELECT * FROM Doctors
            WHERE Location LIKE %s
        """

        cursor.execute(location_query, ('%' + location_term + '%',))
        results = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        results_list = [dict(zip(columns, row)) for row in results]
    
   # Return the results as JSON
        return jsonify(results_list)

    # If the request method is GET, return an empty JSON array
    return jsonify([])


@views.route('/search_specialty', methods=['GET', 'POST'])
def search_specialty():
    if request.method == 'POST':
        specialty_term = request.form['specialty_term']
        db = get_db()
        cursor = db.cursor()
        specialty_query = """
            SELECT * FROM Doctors
            WHERE Specialty LIKE %s
        """

        cursor.execute(specialty_query, ('%' + specialty_term + '%',))
        results = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        results_list = [dict(zip(columns, row)) for row in results]
    
   # Return the results as JSON
        return jsonify(results_list)

    # If the request method is GET, return an empty JSON array
    return jsonify([])

@views.route('/search_hospital', methods=['GET', 'POST'])
def search_hospital():
    if request.method == 'POST':
        hospital_term = request.form['hospital_term']
        db = get_db()
        cursor = db.cursor()
        hospital_query = """
            SELECT * FROM Doctors
            WHERE Hospital LIKE %s
        """

        cursor.execute(hospital_query, ('%' + hospital_term + '%',))
        results = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        results_list = [dict(zip(columns, row)) for row in results]
    
   # Return the results as JSON
        return jsonify(results_list)

    # If the request method is GET, return an empty JSON array
    return jsonify([])



# Add this import at the top of your views.py


# Add this route below your existing search_* routes
@views.route('/search_doctors', methods=['POST', 'GET'])
def search_doctors():
    data = request.get_json()
    name_term = data.get('name_term', '')
    location_term = data.get('location_term', '')

    db = get_db()
    cursor = db.cursor()

    query = """
        SELECT * FROM Doctors
        WHERE (Name LIKE %s OR Specialty LIKE %s OR Hospital LIKE %s OR Treatments_Offered LIKE %s OR Special_Interests LIKE %s)
        AND Location LIKE %s
    """

    cursor.execute(query, ('%' + name_term + '%', '%' + name_term + '%', '%' + name_term + '%', '%' + name_term + '%', '%' + name_term + '%', '%' + location_term + '%'))

    results = cursor.fetchall()
    columns = [column[0] for column in cursor.description]
    results_list = [dict(zip(columns, row)) for row in results]

    return jsonify(results_list)


@views.route('/search_doctor/<id>', methods=['POST', 'GET'])
def search_doctor(id):
    db = get_db()
    cursor = db.cursor()

    query = """
        SELECT * FROM Doctors
        WHERE ID=%s
    """

    cursor.execute(query, (id,))

    result = cursor.fetchone()
    columns = [column[0] for column in cursor.description]
    result_dict = dict(zip(columns, result))

    return jsonify(result_dict)


@views.route('/api/save_search_history', methods=['POST'])
@jwt_required() 
def save_search_history():
    data = request.get_json()
    username = data.get('username', '')
    searchTerm = data.get('searchTerm', '')
    locationTerm = data.get('locationTerm', '')
    
    user = Users.query.filter_by(username=username).first()  # Find the user based on the username

    print(f"username: {username}")
    print(f"searchTerm: {searchTerm}")
    print(f"locationTerm: {locationTerm}")
    
    if user:
        user.search_history = f"{user.search_history},{searchTerm},{locationTerm}"  # Append the new search history to the existing one
        
        # Get the database connection object
        db = get_db()
     
        try:
            # Create a cursor to execute SQL queries
            cursor = db.cursor()
            
            # Update the user's search history
            update_query = "UPDATE Users SET search_history = %s WHERE username = %s"
            cursor.execute(update_query, (user.search_history, username))
            
            # Commit the changes to the database
            db.commit()
            
            return jsonify({'message': 'Search history saved successfully'})
        except pymysql.Error as e:
            # Handle any database errors
            db.rollback()
            return jsonify({'message': 'Error saving search history', 'error': str(e)})
        finally:
            # Close the cursor
            cursor.close()
    else:
        return jsonify({'message': 'User not found'})
    
import pickle
from models import Doctors

@views.route('/recommend_doctors', methods=['POST'])
@jwt_required()
def recommend_doctors():
    current_user = get_jwt_identity()

    # Get the user's search history
    user = Users.query.filter_by(username=current_user).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    search_history = user.search_history.split(',')

    # Get all doctors' information
    doctors = Doctors.query.all()

    # Train the NLP model
    processed_search_history = [preprocess_text(text) for text in search_history]
    model = train_nlp_algorithm(processed_search_history)

    # Get recommended doctors
    recommended_doctors = recommend_func(search_history, model, doctors, condition_specialty_mapping)


    # Convert recommended doctors to a list of dictionaries
    recommended_doctors_dict = [doctor.to_dict() for doctor in recommended_doctors]

    # Return the recommended doctors as a JSON response
    return jsonify({"recommendations": recommended_doctors_dict}), 200




