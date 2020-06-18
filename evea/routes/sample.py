from flask import Blueprint, render_template
from evea.db import mongo
#from flask_restplus import fields, Api, Resource

from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

import os
import re
import sys

sample = Blueprint('sample', __name__)

api = Api(sample)

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
}


@api.route('/', methods=['GET'])
@api.route('/<string:sample_name>/')
class Sample_info(Resource):
    @api.marshal_with(model)
    def get(self, sample_name):
        samples = sample_name.strip().split(',')
        print(sample_names)
        sample_info_oj = mongo.db.sample_info.find(
            {"srr_id": {
                "$in": samples
            }})
        sample_info_lst = list(sample_info_oj)
        return sample_info_lst
