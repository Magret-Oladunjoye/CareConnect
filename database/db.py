import pymysql
from flask import current_app, g
from config import Config


def get_db():
    if 'db' not in g:
        # Connect to the database using values from Flask app configuration
        config = Config()
        g.db = pymysql.connect(
            host=config.DB_HOST,
            user=config.DB_USER,
            password=config.DB_PASS,
            database=config.DB_NAME
        )
        g.db.autocommit = True

    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    db = get_db()
    cursor = db.cursor()
    with current_app.open_resource('schema.sql') as f:
        # Create the tables defined in the schema.sql file
        queries = f.read().decode('utf8').split(';')
        for query in queries:
            cursor().execute(query)
