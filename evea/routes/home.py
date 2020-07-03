from flask import Blueprint, render_template
from evea.db import mongo

from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

# from flask_restplus import fields, Api, Resource

home = Blueprint("home", __name__)

api = Api(home)


@home.route("/", methods=["GET"])
def index():
    return render_template("index.html")

