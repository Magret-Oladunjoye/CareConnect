
#models.py file is used to define the data models for your application.
# In other words, it describes how the data will be structured in your Python
# code and how it will interact with the database.

from database import db
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Doctors(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Specialty = db.Column(db.String(100), nullable=False)
    About = db.Column(db.Text, nullable=False)
    Hospital = db.Column(db.String(100), nullable=False)
    Location = db.Column(db.String(100))
    Special_Interests = db.Column(db.String(100))
    Treatments_Offered = db.Column(db.String(100))
    Work_Experience = db.Column(db.String(100))
    Image_Src = db.Column(db.String(100))

    def __repr__(self):
        return f"Doctor('{self.name}', '{self.specialty}')"

    

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    phone_number = db.Column(db.String(15), nullable=True, default="")
    address = db.Column(db.String(80), nullable=True, default="")
    date_of_birth = db.Column(db.Date(), nullable=True, default=None)
    gender = db.Column(db.String(10), nullable=True, default="")
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phone_number": self.phone_number,
            "address": self.address,
            "date_of_birth": self.date_of_birth.isoformat() if self.date_of_birth else None,
            "gender": self.gender
        }

    def __repr__(self):
        """
        returns string rep of object

        """
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
