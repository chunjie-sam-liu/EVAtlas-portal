from flask import Flask
from flask_cors import CORS
from evea.config import Config, ProductionConfig

app = Flask(__name__)
CORS(app)
# config database
# app.config.from_object(Config)
app.config.from_object(ProductionConfig)

import evea.db
import evea.routing
