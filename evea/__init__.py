from flask import Flask
from evea.config import Config

app = Flask(__name__)
# config database
app.config.from_object(Config)

import evea.db
import evea.routing
