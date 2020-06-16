from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

home=Blueprint('home', __name__)

api = Api(home)

@home.route('/', methods = ['GET'])
def index():
  return render_template('index.html')


test_fields = {
    'source':fields.String,
    'samp':fields.String
    }

test_fields_list = {
  'samples': fields.List(fields.Nested(test_fields))
}

class FuzzyFoo(Resource):
    @marshal_with(test_fields_list)
    def get(self):
        a = list(mongo.db.test.find({}))
        return {'samples': a}
api.add_resource(FuzzyFoo,'/test')
