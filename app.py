from logging.handlers import RotatingFileHandler
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate, upgrade
from flask.cli import AppGroup
import logging
from models import db
from auth import RefreshResource, Login, Profile, SignUp, UpdateProfile, DoctorClaim, Admin, AdminDoctorClaim, UserComments, DeleteComment, Userss, DeleteUser
from flask_restful import Api
from config import DevConfig, ProdConfig
from werkzeug.exceptions import HTTPException
from nlp_training import train_nlp_algorithm
from flask_caching import Cache
from flask_mail import Mail, Message


cache = Cache()
mail = Mail()
def create_app(config):
    app = Flask(__name__, static_url_path="/home", static_folder="./client/build", template_folder="./client/build")
    app.config.from_object(config)

    # Configure cache settings
    cache_config = {
        'CACHE_TYPE': 'simple', 
        'CACHE_DEFAULT_TIMEOUT': 60
    }

    # Initialize cache
    cache.init_app(app, config=cache_config)
    mail.init_app(app)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    JWTManager(app)
    migrate = Migrate(app, db)

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
    api.add_resource(DoctorClaim, '/doctor/claim')
    api.add_resource(Admin, "/admin")
    api.add_resource(
    AdminDoctorClaim,
    '/admin/doctor_claims',
    '/admin/doctor_claims/<int:claim_id>',

)
    api.add_resource(UserComments, "/admin/user/comments")
    api.add_resource(DeleteComment, "/admin/user/comments/<int:comment_id>")
    api.add_resource(DeleteUser, "/admin/users/<int:user_id>")
    api.add_resource(Userss, "/admin/users")
    
    app.config['MAIL_SERVER'] = 'smtp.yandex.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = 'magret.oladunjoye@yandex.com'
    app.config['MAIL_PASSWORD'] = 'qllcfsvhtqlhkcrg'
    app.config['MAIL_DEFAULT_SENDER'] = 'magret.oladunjoye@yandex.com'
    app.config['MAIL_DEBUG'] = True
    
    

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(err):
        return app.send_static_file("index.html")
    

        
    


   

    return app



# Assuming you've already created your Flask app as 'app'
log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
log_handler = RotatingFileHandler('app.log', maxBytes=1000000, backupCount=1)
log_handler.setLevel(logging.DEBUG)
log_handler.setFormatter(log_formatter)

# Create a stream handler for logging
console_handler = logging.StreamHandler()
console_handler.setFormatter(log_formatter)
console_handler.setLevel(logging.DEBUG)

# Get the root logger and add the handlers
logger = logging.getLogger()
logger.addHandler(log_handler)
logger.addHandler(console_handler)

app = create_app(ProdConfig)

from views import views, search_bp

app.register_blueprint(views)
app.register_blueprint(search_bp)

if __name__ == "__main__":
    app.run(debug=True, port="5000")

logging.basicConfig(filename='app.log', level=logging.INFO)

@app.errorhandler(Exception)
def handle_exception(e):
    # pass through HTTP errors
    if isinstance(e, HTTPException):
        return e

    # now you're handling non-HTTP exceptions only
    logging.error(e, exc_info=True)

    return "Internal server error", 500
