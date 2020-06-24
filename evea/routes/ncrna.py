from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

import numpy as np
import itertools

ncrna = Blueprint("ncrna", __name__)
api = Api(ncrna)

ncrna_exp_fields = {
    "GeneSymbol": fields.String,
    "srr_id": fields.String,
    "RPM": fields.Float,
}

ncrna_exp_fields_out = {
    "ncRNA": fields.String,
    "ncrna_exp_lst": fields.List(fields.Nested(ncrna_exp_fields)),
}


class ncRNASampleExp(Resource):
    @marshal_with(ncrna_exp_fields_out)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ncrna", type=str)
        parser.add_argument("sample", type=str)
        parser.add_argument("type", type=str)
        args = parser.parse_args()
        query_mir_lst = args["ncrna"].strip().split(",")
        query_lst = args["sample"].strip().split(",")
        query_db = "exp_" + args["type"]
        ncrna_exp_oj = mongo.db[query_db].aggregate(
            [
                {
                    "$match": {
                        "GeneSymbol": {"$in": query_mir_lst},
                        "srr_id": {"$in": query_lst},
                    }
                },
                {"$project": {"GeneSymbol": 1, "srr_id": 1, "RPM": 1, "_id": 0}},
            ]
        )
        ncrna_exp_lst = list(ncrna_exp_oj)
        return {"ncrna_exp_lst": ncrna_exp_lst, "ncRNA": args["type"]}


api.add_resource(ncRNASampleExp, "/sample")

source_ex_type_exp_fields = {
    "source": fields.String,
    "ex_type": fields.String,
    "GeneSymbol": fields.String,
    "srr_id": fields.List(fields.String),
    "RPM": fields.List(fields.Float),
    "count": fields.Integer,
    "stat": fields.List(fields.Float),
}

source_ex_type_exp_fields_lst = {
    "source_ex_type_exp": fields.List(fields.Nested(source_ex_type_exp_fields))
}


class ncrnaCategoryExp(Resource):
    @marshal_with(source_ex_type_exp_fields_lst)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ncrna", type=str)
        parser.add_argument("source", type=str)
        parser.add_argument("ex_type", type=str)
        parser.add_argument("type", type=str)
        args = parser.parse_args()
        query_mir_lst = args["ncrna"].strip().split(",")
        query_source_lst = args["source"].strip().split(",")
        query_ex_type_lst = args["ex_type"].strip().split(",")
        query_db = "exp_" + args["type"]
        source_exp_oj = mongo.db[query_db].aggregate(
            [
                {"$match": {"GeneSymbol": {"$in": query_mir_lst}}},
                {
                    "$lookup": {
                        "from": "sample_info",
                        "localField": "srr_id",
                        "foreignField": "srr_id",
                        "as": "srr_info",
                    }
                },
                {
                    "$match": {
                        "srr_info.source": {"$in": query_source_lst},
                        "srr_info.ex_type": {"$in": query_ex_type_lst},
                    }
                },
                {"$unwind": "$srr_info"},
                {
                    "$project": {
                        "_id": 0,
                        "GeneSymbol": 1,
                        "srr_id": 1,
                        "RPM": 1,
                        "source": "$srr_info.source",
                        "ex_type": "$srr_info.ex_type",
                    }
                },
            ]
        )
        source_exp_lst = list(source_exp_oj)
        mirna_source_comb_lst = list(
            itertools.product(query_mir_lst, query_source_lst, query_ex_type_lst)
        )
        tmp_dict = {}
        for comb in mirna_source_comb_lst:
            tmp_dict[comb] = {}
            tmp_dict[comb]["GeneSymbol"] = comb[0]
            tmp_dict[comb]["source"] = comb[1]
            tmp_dict[comb]["ex_type"] = comb[2]
            tmp_dict[comb]["srr_id"] = []
            tmp_dict[comb]["RPM"] = []
            tmp_dict[comb]["count"] = 0
        for source_exp in source_exp_lst:
            tmp_comb = (
                source_exp["GeneSymbol"],
                source_exp["source"],
                source_exp["ex_type"],
            )
            tmp_dict[tmp_comb]["srr_id"].append(source_exp["srr_id"])
            tmp_dict[tmp_comb]["RPM"].append(source_exp["RPM"])
            tmp_dict[tmp_comb]["count"] += 1
        for comb in mirna_source_comb_lst:
            tmp_dict[comb]["stat"] = list(
                np.percentile(tmp_dict[comb]["RPM"], [25, 50, 75])
            )
        source_ex_type_exp = list(tmp_dict.values())
        return {"source_ex_type_exp": source_ex_type_exp}


api.add_resource(ncrnaCategoryExp, "/category")

ncRNA_count_fields = {
    "count": fields.Integer,
    "GeneSymbol": fields.String,
}

ncRNA_count_fields_lst = {"ncRNA_lst": fields.List(fields.Nested(ncRNA_count_fields))}


class ncRNAlist(Resource):
    @marshal_with(ncRNA_count_fields_lst)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ncrna", type=str)
        parser.add_argument("expv", type=int, default=1)
        args = parser.parse_args()
        ncRNA_category = [
            "miRNA",
            "rRNA",
            "tRNA",
            "piRNA",
            "snoRNA",
            "snRNA",
            "pRNA",
            "scRNA",
        ]
        ncrna_exp_db = "exp_" + args["ncrna"].strip()
        ncrna_exp_oj = mongo.db[ncrna_exp_db].aggregate(
            [
                {"$match": {"RPM": {"$gte": args["expv"]}}},
                {"$group": {"_id": "$GeneSymbol", "count": {"$sum": 1}}},
                {"$project": {"_id": 0, "GeneSymbol": "$_id", "count": 1}},
                {"$sort": {"count": -1}},
            ]
        )
        ncrna_lst = list(ncrna_exp_oj)
        return {"ncRNA_lst": ncrna_lst[0:10]}


api.add_resource(ncRNAlist, "/ncRNA_lst")


class ncRNAexp(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ncrna", type=str)
        parser.add_argument("type", type=str)
        parser.add_argument("disease", type=int, default=0)
        parser.add_argument("tissues", type=int, default=0)
        parser.add_argument("source", type=int, default=0)
        parser.add_argument("material", type=int, default=0)
        parser.add_argument("condition", type=int, default=0)
        parser.add_argument("ex_type", type=int, default=0)
        args = parser.parse_args()
        ncrna_exp_db = args["type"].strip() + "_samexp"
        ncrna_query = args["ncrna"].strip()
        tmp_l = ["disease", "tissues", "source", "material", "condition", "ex_type"]
        condition = {i: "$exp." + i for i in tmp_l if args[i]}
        ncrna_exp_oj = mongo.db[ncrna_exp_db].aggregate(
            [
                {"$match": {"GeneSymbol": ncrna_query}},
                {"$unwind": "$exp"},
                {"$group": {"_id": condition, "exp_lst": {"$push": "$exp.RPM"}}},
                {"$project": {"_id": 0, "combination": "$_id", "exp_lst": 1}},
            ]
        )
        result_lst = list(ncrna_exp_oj)
        return {"data": result_lst}


api.add_resource(ncRNAexp, "/ncrnaexp")
