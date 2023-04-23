import os
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from models import db
from auth import RefreshResource, Login, Profile, SignUp, UpdateProfile

from flask_restful import Api

def create_app(config):
    app = Flask(__name__, static_url_path="/home", static_folder="./client/build")
    app.config.from_object(config)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    JWTManager(app)

    api_version = "v1"
    api_base_url = f"/api/{api_version}"
    api_docs_url = f"{api_base_url}/docs"
    api_swagger_url = f"{api_base_url}/swagger"

    # create the api
    api = Api(app)

    # add the resources
    api.add_resource(SignUp, "/auth/signup")
    api.add_resource(Login, "/auth/login")
    api.add_resource(Profile, "/auth/profile")
    api.add_resource(UpdateProfile, "/auth/update-profile")
    api.add_resource(RefreshResource, "/auth/refresh")
    

    @app.route("/home")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(err):
        return app.send_static_file("index.html")

    # Add some commands for running migrations and creating the database
    @app.cli.command()
    def db_upgrade():
        """Upgrade the database."""
        with app.app_context():
            upgrade()

    @app.cli.command()
    def db_create():
        """Create the database."""
        db.create_all()

    return app
