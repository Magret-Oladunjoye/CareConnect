import json
import logging
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse
from models import DoctorClaimRequest, Users, db, Comments, Doctors
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
    
)
from flask import Flask, jsonify, make_response, request
import traceback
import logging
logging.basicConfig(level=logging.DEBUG)
from models import Doctors
from flask_mail import Mail, Message
from flask_restful import Api
from flask import current_app
mail = Mail()


# Removed Namespace import and signup_model, login_model, profile_model

# Create request parsers for the POST requests
signup_parser = reqparse.RequestParser()
signup_parser.add_argument("username", type=str, required=True, help="Username is required")
signup_parser.add_argument("email", type=str, required=True, help="Email is required")
signup_parser.add_argument("password", type=str, required=True, help="Password is required")

login_parser = reqparse.RequestParser()
login_parser.add_argument("username", type=str, required=True, help="Username is required")
login_parser.add_argument("password", type=str, required=True, help="Password is required")

update_profile_parser = reqparse.RequestParser()
update_profile_parser.add_argument("username", type=str, required=False)
update_profile_parser.add_argument("email", type=str, required=False)
update_profile_parser.add_argument("phone_number", type=str, required=False)
update_profile_parser.add_argument("address", type=str, required=False)
update_profile_parser.add_argument("date_of_birth", type=str, required=False)
update_profile_parser.add_argument("gender", type=str, required=False)



claim_parser = reqparse.RequestParser()
claim_parser.add_argument("doctor_id", type=int, required=True, help="Doctor ID is required")
claim_parser.add_argument("first_name", type=str, required=True, help="First name is required")
claim_parser.add_argument("last_name", type=str, required=True, help="Last name is required")
claim_parser.add_argument("email", type=str, required=True, help="Email is required")
claim_parser.add_argument("phone_number", type=str, required=True, help="Phone number is required")



class SignUp(Resource):
    
    def post(self):
        data = signup_parser.parse_args()

        username = data.get("username")
        db_user = Users.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"message": f"User with username {username} already exists"})

        # Check if the user is the first user (admin)
        is_admin = Users.query.count() == 0

        new_user = Users(
            username=data.get("username"),
            email=data.get("email"),
            password=generate_password_hash(data.get("password")),
            is_admin=is_admin,
        )

        new_user.save()

        return make_response(jsonify({"message": "User created successfully"}), 201)


class Login(Resource):
    @jwt_required(optional = True)
    def post(self):
        data = login_parser.parse_args()

        username = data.get("username")
        password = data.get("password")

        try:
            db_user = Users.query.filter_by(username=username).first()
        except Exception as e:
            return make_response(jsonify({"message": f"An error occurred while querying the database: {str(e)}"}), 500)

        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            return make_response(jsonify({
                "username": db_user.username, 
                "is_admin": db_user.is_admin,
                "access_token": access_token, 
                "refresh_token": refresh_token
            }), 200)
        else:
            return make_response(jsonify({"message": "Invalid email or password"}), 401)



class Profile(Resource):
    @jwt_required()
    def get(self):
        
        username = get_jwt_identity()
        response_data = {}

        try:
            db_user = Users.query.filter_by(username=username).first()

            if db_user:
                user_data = db_user.to_dict()
                response_data["data"] = user_data
              
                return make_response(jsonify(response_data), 200)
            else:
                response_data["message"] = "User not found"
                return make_response(jsonify(response_data), 404)
        except Exception as e:
            logging.exception("An error occurred while processing the request")
            response_data["message"] = f"An error occurred while processing your request: {str(e)}"
            print(f"response_data: {response_data}, status code: 200")
            return make_response(jsonify(response_data), 500)



class UpdateProfile(Resource):
    @jwt_required
    def put(self):
        email = get_jwt_identity()
        db_user = Users.query.filter_by(email=email).first()

        if not db_user:
            return {"message": "User not found"}, 404

        data = request.get_json()

        # update user profile fields
        db_user.username = data.get('username', db_user.username)
        db_user.phone_number = data.get('phone_number', db_user.phone_number)
        db_user.address = data.get('address', db_user.address)
        db_user.date_of_birth = data.get('date_of_birth', db_user.date_of_birth)
        db_user.gender = data.get('gender', db_user.gender)

        db.session.commit()


        return {"message": "User profile updated successfully"}, 200


class DoctorClaim(Resource):
    def post(self):
        data = claim_parser.parse_args()

        doctor_id = data.get("doctor_id")
        doctor = Doctors.query.get(doctor_id)

        if doctor is None:
            return {"message": "Doctor with the given ID does not exist"}, 404

        # Process the doctor claim request
        new_claim = DoctorClaimRequest(
            doctor_id=data.get("doctor_id"),
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            phone_number=data.get("phone_number"),
        )

        new_claim.save()
        db.session.add(new_claim)
        db.session.commit() 

        return make_response(jsonify({"message": "Doctor claim request submitted successfully"}), 201)
    

  
    



class RefreshResource(Resource):
    @jwt_required()
    def post(self):

        current_user = get_jwt_identity()

        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token": new_access_token}), 200)

# auth.py

class Admin(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user = get_jwt_identity()

            user = Users.query.filter_by(username=current_user).first()

            if not user.is_admin:
                return {"message": "Unauthorized access"}, 401

            claims = DoctorClaimRequest.query.all()
            claim_list = [claim.to_dict() for claim in claims]

            return jsonify({"data": claim_list})
        except SQLAlchemyError as e:
            app.logger.error(f"Failed to get doctor claims: {str(e)}")
            return {"message": "Internal Server Error"}, 500
        

class AdminDoctorClaim(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user = get_jwt_identity()
            user = Users.query.filter_by(username=current_user).first()

            if not user.is_admin:
                return {"message": "Unauthorized access"}, 401

            claims = DoctorClaimRequest.query.all()
            claim_list = [claim.to_dict() for claim in claims]
            return jsonify({"data": claim_list})
        except Exception as e:
            app.logger.error(f"Failed to get doctor claims: {str(e)}")
            return {"message": "Internal Server Error"}, 500

    @jwt_required()
    def put(self, claim_id):
        try:
            current_user = get_jwt_identity()
            user = Users.query.filter_by(username=current_user).first()

            # Ensure the current user is an admin
            if not user.is_admin:
                return {"message": "Unauthorized access"}, 401

            claim = DoctorClaimRequest.query.get(claim_id)
            if not claim:
                return {"message": "Claim not found"}, 404

            data = request.get_json()

            status = data.get('status')
            if status not in ['approved', 'rejected']:
                return {"message": "Invalid status value"}, 400

            claim.status = status
            db.session.commit()

            if status == "approved":
                # Get the doctor's email and name
                doctor_email = claim.email
                doctor_name = f"{claim.first_name} {claim.last_name}"
                self.send_approval_email(doctor_email, doctor_name)

            return {"message": f"Claim {claim_id} updated to {status}"}, 200
        except Exception as e:
           
            return {"message": "Internal Server Error"}, 500

    @jwt_required()
    def delete(self, claim_id):
        try:
            current_user = get_jwt_identity()
            user = Users.query.filter_by(username=current_user).first()

            # Ensure the current user is an admin
            if not user.is_admin:
                return {"message": "Unauthorized access"}, 401

            claim = DoctorClaimRequest.query.get(claim_id)
            if not claim:
                return {"message": "Claim not found"}, 404

            db.session.delete(claim)
            db.session.commit()

            return {"message": f"Claim {claim_id} deleted successfully"}, 200
        except Exception as e:
            app.logger.error(f"Failed to delete claim: {str(e)}")
            return {"message": "Internal Server Error"}, 500
        
from flask import current_app
from flask_mail import Message
from models import db
from flask_restful import Resource





class UserComments(Resource):
    @jwt_required()
    def get(self):
        # Check if the user is an admin
        current_user = get_jwt_identity()
        user = Users.query.filter_by(username=current_user).first()
        if not user or not user.is_admin:
            return jsonify({"message": "Unauthorized"}), 403

        try:
            # Fetch the user comments with their names
            user_comments = db.session.query(Comments).join(Users, Comments.user_id == Users.id).all()

            # Create a list to hold the user comments data
            comments_data = []

            # Loop through the user comments
            for comment in user_comments:
                # Append the user comment info to the comments_data list
                comments_data.append({
                    "id": comment.id,
                    "user_id": comment.user_id,
                    "doctor_id": comment.doctor_id,
                    "rating": comment.rating,
                    "comment": comment.comment,
                    "timestamp": comment.timestamp.isoformat() if comment.timestamp else None,
                    "username": comment.user.username
                })

            # Return the user comments data
            return jsonify(comments_data)
        except SQLAlchemyError as e:
            app.logger.error(f"Failed to retrieve user comments: {str(e)}")
            return {"message": "Internal Server Error"}, 500


class DeleteComment(Resource):
    @jwt_required()
    def delete(self, comment_id):
        try:
            current_user = get_jwt_identity()
            user = Users.query.filter_by(username=current_user).first()
            if not user or not user.is_admin:
                return {"message": "Unauthorized"}, 403

            comment = Comments.query.get(comment_id)
            if not comment:
                return {"message": "Comment not found"}, 404

            db.session.delete(comment)
            db.session.commit()

            return {"message": "Comment deleted successfully"}, 200
        except SQLAlchemyError as e:
            app.logger.error(f"Failed to delete comment: {str(e)}")
            return {"message": "Internal Server Error"}, 500



class DeleteUser(Resource):
    @jwt_required()
    def delete(self, user_id):
        # Check if the user is an admin
        current_user = get_jwt_identity()
        user = Users.query.filter_by(username=current_user).first()
        if not user or not user.is_admin:
            return jsonify({"message": "Unauthorized"}), 403

        try:
            user_to_delete = Users.query.get(user_id)
            if not user_to_delete:
                return jsonify({"message": "User not found"}), 404

            db.session.delete(user_to_delete)
            db.session.commit()

            return jsonify({"message": "User deleted successfully"}), 200
        except SQLAlchemyError as e:
            app.logger.error(f"Failed to delete user: {str(e)}")
            return jsonify ({"message": "Internal Server Error"}), 500


class Userss(Resource):
    @jwt_required()
    def get(self):
        # Check if the user is an admin
        current_user = get_jwt_identity()
        user = Users.query.filter_by(username=current_user).first()
        if not user or not user.is_admin:
            return jsonify({"message": "Unauthorized"}), 403

        try:
            users = Users.query.all()

            # Create a list to hold the user data
            users_data = []

            # Loop through the users
            for user in users:
                # Append the user info to the users_data list
                users_data.append({
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_admin": user.is_admin,
                })

            return jsonify(users_data)
        except SQLAlchemyError as e:
            app.logger.error(f"Failed to retrieve users: {str(e)}")
            return {"message": "Internal Server Error"}, 500

