from flask import Blueprint
from evea.db import mongo

from flask_restful import Api, Resource, fields, marshal_with

search = Blueprint('search', __name__)

api = Api(search)


model = {
    'rnaList': fields.String
}
class RNAList(Resource):
    @marshal_with(model)
    def get(self, rna):
        return {'rnaList': rna}
api.add_resource(RNAList, '/rna/<string:rna>')


