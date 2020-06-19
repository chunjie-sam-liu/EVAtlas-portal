from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal
from collections import Counter, defaultdict

import os
import re
import sys

stat = Blueprint('stat', __name__)
api = Api(stat)

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


class CategoryStat(Resource):
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
api.add_resource(CategoryStat, '/category')

