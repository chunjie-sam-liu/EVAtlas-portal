from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal
from collections import Counter, defaultdict

import os
import re
import sys

category = Blueprint("category", __name__)
api = Api(category)

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
    "samples_info_lst": fields.List(fields.Nested(sample_info_field)),
    "record_n": fields.Integer,
}


class Category(Resource):
    @marshal_with(category_stat_field)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("source", type=str)
        parser.add_argument("ex_type", type=str)
        args = parser.parse_args()
        condition = {}
        condition["source"] = args["source"]
        condition["ex_type"] = args["ex_type"]
        samples_oj = mongo.db.sample_info.aggregate([{"$match": condition}])
        samples_info_lst = list(samples_oj)
        record_n = len(samples_info_lst)
        return {"samples_info_lst": samples_info_lst, "record_n": record_n}


api.add_resource(Category, "/category")

