from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal
from collections import Counter, defaultdict

import os
import re
import sys

category = Blueprint('category', __name__)

api = Api(category)

category_stat_field = {
    'category_stat':
    fields.Nested({
        'sample_n':
        fields.Integer,
        'category_type':
        fields.Nested({
            'ex_type': fields.String,
            'source': fields.String,
        }),
    }),
    'category_n':
    fields.Integer,
    'ex_type_lst':
    fields.List(
        fields.Nested({
            'sample_n': fields.Integer,
            'ex_type': fields.String,
        })),
    'source_type_lst':
    fields.List(
        fields.Nested({
            'sample_n': fields.Integer,
            'source_type': fields.String,
        })),
}


@api.route('/', methods=['GET'])
class CategoryStat(Resource):
    #    @api.marshal_with(model)
    @marshal_with(category_stat_field)
    def get(self):
        sample_category = {}
        category_stat_oj = mongo.db.sample_info.aggregate([{
            "$group": {
                "_id": {
                    "ex_type": "$ex_type",
                    "source": "$source"
                },
                "sample_n": {
                    "$sum": 1
                }
            }
        }, {
            "$project": {
                "_id": 0,
                "category_type": "$_id",
                "sample_n": 1
            }
        }])
        category_stat_lst = list(category_stat_oj)
        category_n = len(category_stat_lst)
        ex_type_oj = mongo.db.sample_info.aggregate([{
            "$group": {
                "_id": "$ex_type",
                "sample_n": {
                    "$sum": 1
                }
            }
        }, {
            "$project": {
                "_id": 0,
                "ex_type": "$_id",
                "sample_n": 1
            }
        }])
        ex_type_lst = list(ex_type_oj)
        source_type_oj = mongo.db.sample_info.aggregate([{
            "$group": {
                "_id": "$source",
                "sample_n": {
                    "$sum": 1
                }
            }
        }, {
            "$project": {
                "_id": 0,
                "source_type": "$_id",
                "sample_n": 1
            }
        }])
        source_type_lst = list(source_type_oj)
        return {
            'category_n': category_n,
            'category_stat': category_stat_lst,
            'ex_type_lst': ex_type_lst,
            'source_type_lst': source_type_lst
        }


api.add_resource(CategoryStat, '/api/category')

ncRNA_tag_stat_fields = {
    "miRNA": fields.Integer,
    "piRNA": fields.Integer,
    "pRNA": fields.Integer,
    "rRNA": fields.Integer,
    "scRNA": fields.Integer,
    "snoRNA": fields.Integer,
    "snRNA": fields.Integer,
    "tRNA": fields.Integer,
}

ncRNA_tag_ratio_fields = {
    "miRNA": fields.Float,
    "piRNA": fields.Float,
    "pRNA": fields.Float,
    "rRNA": fields.Float,
    "scRNA": fields.Float,
    "snoRNA": fields.Float,
    "snRNA": fields.Float,
    "tRNA": fields.Float,
}

sample_info_field = {
    "gse_id": fields.String,
    "srp_id": fields.String,
    "species": fields.String,
    "rna_class": fields.String,
    "source": fields.String,
    "ex_type": fields.String,
    "gsm_id": fields.String,
    "srr_id": fields.String,
    "data_class": fields.String,
    "pubmed_id": fields.String,
    "treatment": fields.String,
    "detail": fields.String,
    "phase": fields.String,
    "ssr_tag_info": fields.List(fields.Integer),
    "ssr_map_info": fields.List(fields.Integer),
    "tag_stat": fields.Nested(ncRNA_tag_stat_fields),
    "ratio_stat": fields.Nested(ncRNA_tag_ratio_fields),
}

sample_info_field_lst = {
    "sample_info": fields.List(fields.Nested(sample_info_field)),
    "record_n": fields.Integer,
}


@api.route('/<string:category_name>/<string:query_type>/')
class Category(Resource):
    @marshal_with(category_stat_field)
    def get(self, category_name, query_type):
        condition = {}
        condition['category_name'] = category_name
        condition['query_type'] = query_type
        samples_oj = mongo.db.sample_info.aggregate([{"$match": condition}])
        samples_lst = list(samples_oj)
        return samples_lst


api.add_resource(Category,
                 '/api/category/<string:category_name>/<string:query_type>/')

