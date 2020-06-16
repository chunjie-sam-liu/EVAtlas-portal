from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

import os
import re
import sys

sample = Blueprint('sample', __name__)

api = Api(sample)

@sample.route('/', methods = ['GET'])
def index():
  return render_template('index.html')


sample_info_fields = {
    "GEO_project_id": fields.String,
    "SRA_project_id": fields.String,
    "Species_category": fields.String,
    "RNA_category": fields.String,
    "Source": fields.String,
    "EV_category": fields.String,
    "GEO_sample_id": fields.String,
    "SRA_sample_id": fields.String,
    "Data_type": fields.String,
    "Pubmed_id": fields.String,
    "Condition": fields.String,
    "Detail": fields.String,
    "phrase": fields.String,
    "ssr_tag_info": fields.List(fields.Integer),
    "ssr_map_info": fields.List(fields.Float),
    "tag_stat" : fields.Nested({
      "miRNA": fields.Integer,
      "piRNA": fields.Integer,
      "pRNA": fields.Integer,
      "rRNA": fields.Integer,
      "scRNA": fields.Integer,
      "snoRNA": fields.Integer,
      "snRNA": fields.Integer,
      "tRNA": fields.Integer,
    }),
    "ratio_stat": fields.Nested({
    "miRNA": fields.Float,
    "piRNA": fields.Float,
    "pRNA": fields.Float,
    "rRNA": fields.Float,
    "scRNA": fields.Float,
    "snoRNA": fields.Float,
    "snRNA": fields.Float,
    "tRNA": fields.Float
  }),
}

sample_info_list_fields = {
    "samples" : fields.List(fields.Nested(sample_info_fields)),
    "page":  fields.Integer,
    "size":  fields.Integer,
    "count": fields.Integer,
    "total": fields.Integer,
}

class SampleListALL(Resource):
    @marshal_with(sample_info_list_fields)
    def get(self):
      parser = reqparse.RequestParser()
      parser.add_argument('Source')
      parser.add_argument('EV_category')
      parser.add_argument('page', type=int, default=1)
      parser.add_argument('size', type=int, default=50)
      parser.add_argument('total', type=bool, default=False)
      args = parser.parse_args()
      condition = {}
      record_skip = (args['page'] - 1) * args['size']
      record_limit = args['size']
      total = None
      if args['Source']:
        condition['Source'] = args['tf']
      if args['EV_category']:
        condition['EV_category'] = args['EV_category']
      if args['total']:
        samples_mongo_oj = mongo.db.sample_info.find(condition)
        total = samples_mongo_oj.count()
      else:
        samples_mongo_oj = mongo.db.sample_info.find(condition).skip(record_skip).limit(record_limit)
      samples = list (samples_mongo_oj)
      return {'samples': samples, 'page': args['page'], 'size': args['size'], 'count': len(samples), 'total': total}

api.add_resource(SampleListALL, '/test')