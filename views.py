#create website routes for our websites where users can go to, except login 

from flask import Blueprint, render_template, jsonify, json, request #define that this file is a blueprint of our app
from database.db import get_db
from urllib.parse import unquote
from models import Users
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, verify_jwt_in_request
from nlp_training import preprocess_text, train_nlp_algorithm, recommend_doctors as recommend_func, condition_specialty_mapping
from models import Doctors, Users, Comments
from datetime import datetime
from sqlalchemy import text

views = Blueprint('views', __name__)
search_bp = Blueprint('search', __name__, url_prefix='/search')
#now that we have these blurptints defined, we need to register them in our __init__,py

@views.route('/')
def index():
    return render_template('index.html')



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


from flask import request

@views.route('/search_doctor/<id>/ratings', methods=['PUT'])
@jwt_required(optional=False)
def add_rating_comment(id):  # id has been added here
    db = get_db()
    cursor = db.cursor()
    
    # Query to fetch the doctor with the given ID
    query = """
        SELECT * FROM Doctors
        WHERE ID=%s
    """
    cursor.execute(query, (id,))
    result = cursor.fetchone()

    if not result:
        return jsonify({"message": "Doctor not found"}), 404

    # Now result contains the doctor data, and you can proceed with your logic.
    
    data = request.get_json()
    rating = data.get('rating')
    comment_text = data.get('comment')
    current_date = datetime.now().date()  # Get the current date

    current_username = get_jwt_identity()
    
    # Query the Users model with the username to get the User instance
    current_user = Users.query.filter_by(username=current_username).first()
    
    # Check if the user is authenticated
    if not current_user:
        return jsonify({"message": "User must be logged in to leave a comment"}), 403

    # Create a new comment
    comment = Comments(
        user_id=current_user.id,
        doctor_id=id,
        rating=rating,
        comment=comment_text,
        timestamp=current_date
    )

    comment.save()
    db.commit();
    return jsonify({"message": "Rating and comment added successfully"})

@views.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    query = request.args.get('query', '')
    db = get_db()
    cursor = db.cursor()

    # Use an SQL SELECT statement to fetch only the names of the doctors
    sql_query = """
        SELECT Name FROM Doctors
        WHERE Name LIKE %(query)s
    """
    cursor.execute(sql_query, {'query': f'%{query}%'})

    suggestions = cursor.fetchall()
    suggestion_names = [doctor[0] for doctor in suggestions]

    return jsonify(suggestion_names)






@views.route('/search_doctor/<id>/comments_ratings', methods=['GET'])
def get_comments_ratings(id):

    # Fetch the comments
    comments = Comments.query.filter_by(doctor_id=id).all()

    # If no comments are found for the doctor
    if not comments:
        return jsonify({"message": "No comments found for this doctor."}), 404

    # Create a list to hold the comments data
    comments_data = []

    # Loop through the comments
    for comment in comments:
        # Fetch the user who made the comment
        user = Users.query.get(comment.user_id)

        # Append the comment info to the comments_data list
        comments_data.append({
            "username": user.username,
            "rating": comment.rating,
            "comment": comment.comment,
            "date": comment.timestamp.isoformat() if comment.timestamp else None,
        })

    # Return the comments data
    return jsonify(comments_data)


@views.route('/search_doctor/<id>/average_rating', methods=['GET'])
def get_average_rating(id):
    # Fetch the comments
    comments = Comments.query.filter_by(doctor_id=id).all()

    # If no comments are found for the doctor
    if not comments:
        return jsonify({"message": "No comments found for this doctor."}), 404

    # Calculate the average rating
    total_ratings = sum(comment.rating for comment in comments)
    average_rating = total_ratings / len(comments)

    # Format the average rating as a float with one decimal point
    average_rating = round(average_rating, 1)

    # Return the average rating
    return jsonify({"average_rating": average_rating})



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




