from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal
from collections import Counter, defaultdict

import os
import re
import sys

anno = Blueprint('anno', __name__)
api = Api(anno)

ncrna_basic_fields = {
    'pre_acc': fields.String(attribute='premiRNA_acc'),
    'pre_seq': fields.String(attribute='premiRNA_seq'),
    'accession': fields.String(attribute='miRNA_acc'),
    'start': fields.Integer(attribute='miRNA_start'),
    'pre_chr': fields.String(attribute='premiRNA_chr'),
    'chromosome': fields.String(attribute='miRNA_chr'),
    'sequence': fields.String(attribute='miRNA_seq'),
    'end': fields.String(attribute='miRNA_end'),
    'premirna': fields.String(attribute='premiRNA_id'),
    'family': fields.String(attribute='miRNA_fam'),
    'pre_end': fields.Integer(attribute='premiRNA_end'),
    'pre_start': fields.Integer(attribute='premiRNA_start'),
}

ncrna_basic_list_fields = {
    'mirna_basic_list': fields.List(fields.Nested(ncrna_basic_fields))
}


class ncrnaAnno(Resource):
    @marshal_with(ncrna_basic_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ncrna', type = str)
        args = parser.parse_args()
        query_ncrna_list = args['ncrna'].strip().split(',')
        mcur = mongo.db.ncrna_anno.find({"GeneSymbol":{"$in":query_ncrna_list}})
        ncrna_list = list(mcur)
        return {'mirna_basic_list': ncrna_list}
api.add_resource(ncrnaAnno,'/')

class OneSymbolAnno(Resource):
    @marshal_with(ncrna_basic_fields)
    def get(self, rna):
        mcur = mongo.db.ncrna_anno.find_one({'GeneSymbol': rna})
        return mcur
api.add_resource(OneSymbolAnno, '/one/<string:rna>')