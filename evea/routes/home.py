from flask import Blueprint, render_template
from evea.db import mongo
# from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal
from flask_restplus import fields, Api, Resource

home = Blueprint('home', __name__)

api = Api(home)


@home.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@api.route('/hello', methods=['GET'])
class Hello(Resource):
    def get(self):
        return {'hello': 'workd'}


model = api.model('Model', {
    'GEO_project_id': fields.String,
    'SRA_project_id': fields.String
})


@api.route('/home', '/test', methods=['GET'])
class FuzzyFoo(Resource):
    # @api.marshal_with(model)
    @api.marshal_list_with(model)
    def get(self):
        cur = mongo.db.sample_info.find().limit(5)
        # print(list(cur))
        a = list(cur)
        return a
