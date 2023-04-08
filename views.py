#create website routes for our websites where users can go to, except login 

from flask import Blueprint, render_template, request #define that this file is a blueprint of our app
from database.db import get_db

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
            SELECT * FROM ankara
            WHERE name LIKE %s
            UNION
            SELECT * FROM cyprus
            WHERE name LIKE %s
            UNION
            SELECT * FROM izmir
            WHERE name LIKE %s
            UNION
            SELECT * FROM kocaeli
            WHERE name LIKE %s
        """

        cursor.execute(name_query, ('%' + name_term + '%',) * 4)
        results = cursor.fetchall()

        # Render the search results template with the retrieved results
        return render_template('search.html', results=results)
    
    # If the request method is GET, render the search page template
    return render_template('search.html')


@views.route('/search_location', methods=['GET', 'POST'])
def search_location():
    if request.method == 'POST':
        location_term = request.form['location_term']
        db = get_db()
        cursor = db.cursor()
        location_query = """
            SELECT * FROM ankara
            WHERE location LIKE %s
            UNION
            SELECT * FROM cyprus
            WHERE location LIKE %s
            UNION
            SELECT * FROM izmir
            WHERE location LIKE %s
            UNION
            SELECT * FROM kocaeli
            WHERE location LIKE %s
        """

        cursor.execute(location_query, ('%' + location_term + '%',) * 4)
        results = cursor.fetchall()

        # Render the search results template with the retrieved results
        return render_template('search.html', results=results)
    
    # If the request method is GET, render the search page template
    return render_template('search.html')


@views.route('/search_specialty', methods=['GET', 'POST'])
def search_specialty():
    if request.method == 'POST':
        specialty_term = request.form['specialty_term']
        db = get_db()
        cursor = db.cursor()
        specialty_query = """
            SELECT * FROM ankara
            WHERE specialty LIKE %s
            UNION
            SELECT * FROM cyprus
            WHERE specialty LIKE %s
            UNION
            SELECT * FROM izmir
            WHERE specialty LIKE %s
            UNION
            SELECT * FROM kocaeli
            WHERE specialty LIKE %s
        """

        cursor.execute(specialty_query, ('%' + specialty_term + '%',) * 4)
        results = cursor.fetchall()

        # Render the search results template with the retrieved results
        return render_template('search.html', results=results)
    
    # If the request method is GET, render the search page template
    return render_template('search.html')

@views.route('/search_hospital', methods=['GET', 'POST'])
def search_hospital():
    if request.method == 'POST':
        hospital_term = request.form['hospital_term']
        db = get_db()
        cursor = db.cursor()
        hospital_query = """
            SELECT * FROM ankara
            WHERE hospital LIKE %s
            UNION
            SELECT * FROM cyprus
            WHERE hospital LIKE %s
            UNION
            SELECT * FROM izmir
            WHERE hospital LIKE %s
            UNION
            SELECT * FROM kocaeli
            WHERE hospital LIKE %s
        """

        cursor.execute(hospital_query, ('%' + hospital_term + '%',) * 4)
        results = cursor.fetchall()

        # Render the search results template with the retrieved results
        return render_template('search.html', results=results)
    
    # If the request method is GET, render the search page template
    return render_template('search.html')