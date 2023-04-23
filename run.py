from profile import run
from main import create_app
from config import DevConfig, ProdConfig
import logging
from logging.handlers import RotatingFileHandler
from views import views, search_bp


# Assuming you've already created your Flask app as 'app'
log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
log_handler = RotatingFileHandler('app.log', maxBytes=1000000, backupCount=1)
log_handler.setLevel(logging.DEBUG)
log_handler.setFormatter(log_formatter)



app = create_app(ProdConfig)
app.register_blueprint(views)
app.register_blueprint(search_bp)




#run with 
if __name__ == "__main__":
    app.run(debug = True, port = "5000")