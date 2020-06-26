from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

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

ncRNA_count_fields = {
    "loci": fields.String(attribute="loci"),
    "tissues": fields.Integer(attribute="tissue_n"),
    "samples": fields.Integer(attribute="sample_n"),
    "GeneSymbol": fields.String,
}

ncRNA_count_fields_lst = {"ncRNA_lst": fields.List(fields.Nested(ncRNA_count_fields))}


class ncRNAlist(Resource):
    @marshal_with(ncRNA_count_fields_lst)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ncrna", type=str)
        parser.add_argument("page", type=int, default=1)
        parser.add_argument("size", type=int, default=50)
        args = parser.parse_args()
        record_skip = (args["page"] - 1) * args["size"]
        record_limit = args["size"]
        condition = {}
        condition["class"] = {"$in": args["ncrna"].strip().split(",")}
        ncrna_exp_oj = (
            mongo.db.ncrna_hit.find(condition, {"class": 0, "_id": 0})
            .skip(record_skip)
            .limit(record_limit)
        )
        ncrna_lst = list(ncrna_exp_oj)
        return {"ncRNA_lst": ncrna_lst}


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


class SrpHeatmap(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("srp", type=str)
        parser.add_argument("ncrna", type=str)
        args = parser.parse_args()
        basic_match = {"$match": {"srp_id": {"$in": args["srp"].strip().split(",")}}}
        ncrna_dict = {z: 1 for z in args["ncrna"].strip().split(",")}
        project_show = {"$project": {"_id": 0, "srp_id": 1}}
        project_show["$project"].update(ncrna_dict)
        srp_exp_oj = mongo.db.srp_top_exp.aggregate([basic_match, project_show])
        srp_heatmap_lst = list(srp_exp_oj)
        return {"srp_heatmap_lst": srp_heatmap_lst}


api.add_resource(SrpHeatmap, "/srpheatmap")
