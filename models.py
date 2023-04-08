
#models.py file is used to define the data models for your application.
# In other words, it describes how the data will be structured in your Python
# code and how it will interact with the database.

from database import db
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    about = db.Column(db.Text, nullable=False)
    hospital = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    special_interests = db.Column(db.String(100))
    treatments_offered = db.Column(db.String(100))
    work_experience = db.Column(db.String(100))
    education = db.Column(db.String(100))

    def __repr__(self):
        return f"Doctor('{self.name}', '{self.specialty}')"

    

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        """
        returns string rep of object

        """
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
