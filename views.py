#create website routes for our websites where users can go to, except login 

from flask import Blueprint, render_template, jsonify, request #define that this file is a blueprint of our app
from database.db import get_db
from urllib.parse import unquote

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
        WHERE (Name LIKE %s OR Specialty LIKE %s OR Hospital LIKE %s)
        AND Location LIKE %s
    """

    cursor.execute(query, ('%' + name_term + '%', '%' + name_term + '%', '%' + name_term + '%', '%' + location_term + '%'))

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
