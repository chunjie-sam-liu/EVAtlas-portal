from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

import os
import re
import sys
import numpy as np

function = Blueprint('Function', __name__)

api = Api(function)

