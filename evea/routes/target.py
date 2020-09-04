from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

target = Blueprint("target", __name__)
api = Api(target)

mir_target_fields = {
    "mirna": fields.String(attribute="miRNA"),
    "Confidence": fields.String(attribute="confidence"),
    "Target": fields.String(attribute="target"),
    "PMID": fields.String(attribute="pubmedid"),
    "Source": fields.String(attribute="source"),
    "Experiment": fields.String(attribute="experiment"),
}

mir_target_list_fields = {
    "mir_target_list": fields.List(fields.Nested(mir_target_fields)),
}


class mirnaTarget(Resource):
    @marshal_with(mir_target_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna", type=str)
        args = parser.parse_args()
        condition = {"miRNA": args.mirna}
        mcur = mongo.db.mir2target.find(condition)

        return {"mir_target_list": list(mcur.limit(2000))}


api.add_resource(mirnaTarget, "")

model_targets = {
    "mir_target_list": fields.List(fields.Nested(mir_target_fields)),
    "n_record": fields.Integer(),
}


class FilterTargets(Resource):
    @marshal_with(model_targets)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna", type=str, required=True)
        parser.add_argument("filter", type=str, default="")
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=5)
        args = parser.parse_args()

        record_skip = args.page * args.size
        record_limit = args.size

        condition = {"miRNA": args.mirna}
        if args.filter != "":
            condition["target"] = {"$regex": args.filter, "$options": "i"}

        mcur = mongo.db.mir2target.find(condition)
        n_record = mcur.count()
        return {
            "mir_target_list": list(mcur.skip(record_skip).limit(record_limit)),
            "n_record": n_record,
        }


api.add_resource(FilterTargets, "/filter")

