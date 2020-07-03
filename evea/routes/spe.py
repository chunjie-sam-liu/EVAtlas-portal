from flask import Blueprint, render_template
from evea.db import mongo
import pymongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

import itertools

spe = Blueprint("spe", __name__)
api = Api(spe)


class speCategroy(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("type", type=str)
        parser.add_argument("ex_type", type=str)
        parser.add_argument("filter", type=str, default="")
        args = parser.parse_args()
        spe_type = args["type"]
        ex_type = args["ex_type"]
        query_db = "spe_" + spe_type
        condition = {}
        condition["ex_type"] = args["ex_type"]
        if args["filter"] != "":
            condition[spe_type] = {"$regex": args["filter"], "$options": "i"}
        spe_lst = list(mongo.db[query_db].find(condition, {"_id": 0}))
        show_piRNA = mongo.db.display_piRNA.distinct("GeneSymbol")
        for z in spe_lst:
            for t in z["ncrna"]:
                if t["class"] == "piRNA":
                    t["GeneSymbol"] = list(
                        set(show_piRNA).intersection(set(t["GeneSymbol"]))
                    )
        return {"data": spe_lst}


api.add_resource(speCategroy, "/spetype")


class speCategroySample(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("type", type=str)
        parser.add_argument("ex_type", type=str)
        parser.add_argument("term", type=str)
        args = parser.parse_args()
        query_type = args["type"]
        ex_type = args["ex_type"]
        query_term = args["term"]
        condition = {"ex_type": args["ex_type"], query_type: query_term}
        if query_type == "disease":
            condition.update({"condition": {"$ne": "Normal"}})
        srr_lst = list(mongo.db.sample_info.find(condition, {"_id": 0, "srr_id": 1}))
        return {"data": srr_lst}


api.add_resource(speCategroySample, "/spesrr")
