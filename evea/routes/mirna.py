from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

mirna = Blueprint('mirna', __name__)
api = Api(mirna)



mir_target_fields = {
    'mirna': fields.String,
    'confidence': fields.String,
    'target': fields.String,
    'pubmedid': fields.String,
    'source': fields.String,
    'experiment': fields.String,
}

mir_target_list_fields = {
    'mir_target_list': fields.List(fields.Nested(mir_target_fields)),
}


class mirnaTarget(Resource):
    @marshal_with(mir_target_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type=str)
        parser.add_argument("page", type=int, default=1)
        parser.add_argument("records", type=int, default=10)
        args = parser.parse_args()
        record_skip = (args["page"] - 1) * args["records"]
        condition = {}
        if args['mirna_id']:
            mirna_target_oj = mongo.db.mir2target.aggregate([{
                "$match": {
                    "miRNA": args['mirna']
                }
            }, {
                "$sort": {
                    "confidence": -1
                }
            }, {
                "$skip":
                record_skip
            }, {
                "$limit":
                args["records"]
            }])
            mirna_target_lst = list(mirna_target_oj)
            return {"mir_target_list": mirna_target_lst}


api.add_resource(mirnaTarget, "/api/mirna_target")

mir_exp_fields = {
    "GeneSymbol": fields.String,
    "srr_id": fields.String,
    "RPM": fields.Float,
}

mir_exp_fields_lst = {
    'mir_sample_exp': fields.List(fields.Nested(mir_exp_fields))
}

class mirnaSampleExp(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type=str)
        parser.add_argument('sample', type=str)
        args = parser.parse_args()
        query_mir_lst = args['mirna'].strip().split(',')
        query_lst = args['sample'].strip().split(',')
        mirna_exp_oj = mongo.db.exp_miRNA.aggregate([{
            "$match": {
                "GeneSymbol": {
                    "$in": query_mir_lst
                },
                "srr_id": {
                    "$in": query_lst
                }
            }
        }])
        mirna_exp_lst = list(mirna_exp_oj)
        return {'mir_sample_exp': mirna_exp_lst}
api.add_resource(mirnaTarget, "/api/mirna_sample")



class mirnaSourceExp(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type=str)
        parser.add_argument('source', type=str)
        args = parser.parse_args()
        query_mir_lst = args['mirna'].strip().split(',')
        query_source_lst = args['source'].strip().split(',')
        source_exp_oj = mongo.db.exp_miRNA.aggregate([{"$match": {"GeneSymbol":{"$in":query_mir_lst}}}, {"$lookup":{"from": "sample_info", "localField": "srr_id", "foreignField": "srr_id", "as": "srr_info"}}, {"$match":{"srr_info.source" : {"$in": query_source_lst}}}, {"$unwind": "$srr_info"}, {"$project": {"_id":0, "GeneSymbol":1, "srr_id":1, "RPM":1, "source": "$srr_info.source", "ex_type": "$srr_info.ex_type"}}])
        source_exp_lst = list(source_exp_oj)
      
        source_lst = [source for source in sample_sources.values()]
        if query_lst[0] in source_lst:
