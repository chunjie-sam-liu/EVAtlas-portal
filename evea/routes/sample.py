from flask import Blueprint, render_template
from evea.db import mongo
# from flask_restplus import fields, Api, Resource

from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

sample = Blueprint('sample', __name__)

api = Api(sample)


@api.route('/<string:sample_name>', methods=['GET'])
class Sample(Resource):
    @api.marshal_with(model)
    def get(self, sample_name):
        print(sample_name)
        cur = mongo.db.sample_info.find().limit(10)
        s = list(cur)
        return s
