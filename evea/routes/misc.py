from flask import Blueprint
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal


misc = Blueprint("misc", __name__)
api = Api(misc)


class TCGAmiRNA(Resource):
    pass


class FuncmiRNA(Resource):
    pass


class TCGAsnoRNA(Resource):
    pass

