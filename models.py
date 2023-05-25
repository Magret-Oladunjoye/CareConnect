
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

 # models.py

class DoctorClaimRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.ID'))  # Foreign key for doctors table
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Foreign key for users table
    user = db.relationship('Users', backref=db.backref('doctor_claim_requests', lazy=True))
    doctor = db.relationship('Doctors', backref=db.backref('doctor_claim_requests', lazy=True))
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    professional_id = db.Column(db.String(100))
    document = db.Column(db.String(200))  # Path to the uploaded document
    status = db.Column(db.String(20), default="pending")  # pending, approved, rejected
    
    def to_dict(self):
        return {
            "id": self.id,
            "doctor_id": self.doctor_id,
            "user_id": self.user_id,
            "full_name": self.full_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "professional_id": self.professional_id,
            "document": self.document,
            "status": self.status
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

   

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    phone_number = db.Column(db.String(15), nullable=True, default="")
    address = db.Column(db.String(80), nullable=True, default="")
    date_of_birth = db.Column(db.Date(), nullable=True, default=None)
    gender = db.Column(db.String(10), nullable=True, default="")
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    
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
