from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

mirna=Blueprint('mirna', __name__)
api = Api(mirna)

@mirna.route('/', methods = ['GET'])
def index():
  return render_template('index.html')

test_fields = {
    'source':fields.String,
    'samp':fields.String
    }

class FuzzyFoo(Resource):
    @marshal_with(test_fields)
    def get(self):
        a = [{'source':'seminal','samp':'ar'},{'source':'s','samp':'e'}]
        return a
api.add_resource(FuzzyFoo,'/test')