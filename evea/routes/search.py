from flask import Blueprint
from evea.db import mongo

from flask_restful import Api, Resource, fields, marshal_with
import time

search = Blueprint('search', __name__)

api = Api(search)


model_rnalist = {
    'rna': fields.String
}
class RNAList(Resource):
    @marshal_with(model_rnalist)
    def get(self, r):
        m_cur = mongo.db.rna_symbol.find(
            {'search_name': {'$regex': r}},
            {'rna': 1, '_id': 0}).limit(5)
        return list(m_cur)

api.add_resource(RNAList, '/rna/<string:r>')


