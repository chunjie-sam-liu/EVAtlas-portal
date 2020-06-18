from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal
from collections import Counter, defaultdict

import os
import re
import sys

category = Blueprint('category', __name__)

api = Api(category)

miR_basic_fields = {
    'pre_acc': fields.String(attribute='premiRNA_acc'),
    'pre_seq': fields.String(attribute='premiRNA_seq'),
    'accession': fields.String(attribute='miRNA_acc'),
    'start': fields.Integer(attribute='miRNA_start'),
    'pre_chr': fields.String(attribute='premiRNA_chr'),
    'chromosome': fields.String(attribute='miRNA_chr'),
    'sequence': fields.String(attribute='miRNA_seq'),
    'end': fields.String(attribute='miRNA_end'),
    'mirna': fields.String(attribute='miRNA_id'),
    'premirna': fields.String(attribute='premiRNA_id'),
    'family': fields.String(attribute='miRNA_fam'),
    'pre_end': fields.Integer(attribute='premiRNA_end'),
    'pre_start': fields.Integer(attribute='premiRNA_start'),
    'first_base': fields.String,
    'two_to_eight': fields.String,
    'the_remaining': fields.String,
}

miR_basic_list_fields = {
    'mirna_basic_list': fields.List(fields.Nested(miR_basic_fields))
}
