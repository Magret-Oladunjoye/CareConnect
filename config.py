from decouple import config
import os
from datetime import timedelta

from dotenv import load_dotenv


load_dotenv()

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

DB_HOST = 'localhost'
DB_NAME = 'care_connect'
DB_USER = 'mysql'
DB_PASS = 'Oxfordset12'

class Config:
    # General Config
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    FLASK_APP = 'app.py'
    FLASK_ENV = os.environ.get('FLASK_ENV') or 'development'

    # Database Config
    DB_HOST = 'localhost'
    DB_NAME = 'care_connect'
    DB_USER = 'mysql'
    DB_PASS = 'Oxfordset12'



class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + '/' + DB_NAME
    DEBUG = True
    # SQLALCHEMY_ECHO=True


class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + '/' + DB_NAME
    DEBUG = os.getenv("DEBUG", False)
    SQLALCHEMY_ECHO = os.getenv("ECHO", False)
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", False)


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + '/' + DB_NAME
    SQLALCHEMY_ECHO = False
    TESTING = True
