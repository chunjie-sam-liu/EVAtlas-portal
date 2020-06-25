from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

target = Blueprint("target", __name__)
api = Api(target)

mir_target_fields = {
    "mirna": fields.String,
    "confidence": fields.String,
    "target": fields.String,
    "pubmedid": fields.String,
    "source": fields.String,
    "experiment": fields.String,
}

mir_target_list_fields = {
    "mir_target_list": fields.List(fields.Nested(mir_target_fields)),
}


class mirnaTarget(Resource):
    @marshal_with(mir_target_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna", type=str)
        parser.add_argument("page", type=int, default=1)
        parser.add_argument("records", type=int, default=10)
        args = parser.parse_args()
        record_skip = (args["page"] - 1) * args["records"]
        condition = {}
        if args["mirna"]:
            mirna_target_oj = mongo.db.mir2target.aggregate(
                [
                    {"$match": {"miRNA": args["mirna"]}},
                    {"$sort": {"confidence": -1}},
                    {"$skip": record_skip},
                    {"$limit": args["records"]},
                ]
            )
            mirna_target_lst = list(mirna_target_oj)
            return {"mir_target_list": mirna_target_lst}


api.add_resource(mirnaTarget, "/")
