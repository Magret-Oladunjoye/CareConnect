from flask import Flask
from flask_restx import Api
from models import Doctor, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from views import views, search_bp
from auth import auth_ns
from flask_cors import CORS
from database.db import get_db
from models import db 

def create_app(config):
    app = Flask(__name__, static_url_path="/", static_folder="./client/build")
    app.config.from_object(config)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app)

    # Register the search blueprint
    app.register_blueprint(search_bp)
    app.register_blueprint(views)
    api.add_namespace(auth_ns)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(err):
        return app.send_static_file("index.html")

    # model (serializer)
    @app.shell_context_processor
    def make_shell_context():
        return {"db": db, "Doctord": Doctor, "user": User}

    return app
