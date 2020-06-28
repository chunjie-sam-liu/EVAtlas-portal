from flask import Blueprint, render_template
from evea.db import mongo
import pymongo
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
    "chromosome": fields.String(attribute="chromosome"),
    "strand": fields.String(attribute="-"),
    "end": fields.String(attribute="end"),
    "start": fields.String(attribute="start"),
    "tissues": fields.Integer(attribute="tissue_n"),
    "samples": fields.Integer(attribute="sample_n"),
    "GeneSymbol": fields.String,
}

ncRNA_count_fields_lst = {
    "ncRNA_lst": fields.List(fields.Nested(ncRNA_count_fields)),
    "n_recourd": fields.Integer,
}


class ncRNAlist(Resource):
    @marshal_with(ncRNA_count_fields_lst)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ncrna", type=str, required=True)
        parser.add_argument("filter", type=str, default="")
        parser.add_argument("sort", type=str, default="desc")
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        sort_option = {"asc": 1, "desc": -1}

        condition = {"class": args.ncrna}
        if args.filter != "":
            condition["GeneSymbol"] = {"$regex": args.filter, "$options": "i"}

        mcur = mongo.db.ncrna_hit.find(condition, {"class": 0, "_id": 0}).sort(
            "sample_n", sort_option[args.sort]
        )
        n_record = mcur.count()

        ncrna_lst = list(mcur.skip(record_skip).limit(record_limit))
        return {"ncRNA_lst": ncrna_lst, "n_recourd": n_record}


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
        parser.add_argument("ex_type", type=str, default=0)
        args = parser.parse_args()
        ncrna_exp_db = args["type"].strip() + "_samexp"
        ncrna_query = args["ncrna"].strip()
        tmp_l = ["disease", "tissues", "source", "material", "condition"]
        condition = {i: "$exp." + i for i in tmp_l if args[i]}
        ncrna_exp_oj = mongo.db[ncrna_exp_db].aggregate(
            [
                {"$match": {"GeneSymbol": ncrna_query}},
                {"$unwind": "$exp"},
                {"$match": {"exp.ex_type": args["ex_type"]}},
                {"$group": {"_id": condition, "exp_lst": {"$push": "$exp.RPM"}}},
                {
                    "$project": {
                        "_id": 0,
                        "tissues": "$_id.tissues",
                        "exp_lst": 1,
                        "average": {"$avg": "$exp_lst"},
                        "min": {"$min": "$exp_lst"},
                        "max": {"$max": "$exp_lst"},
                    }
                },
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


class SampleRankExp(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("sample", type=str)
        parser.add_argument("all", type=int, default=0)
        parser.add_argument("size", type=int, default=30)
        args = parser.parse_args()
        query_sample = args["sample"].strip()
        condition = [
            {"$match": {"srr_id": query_sample}},
            {"$unwind": "$ncrna_exp"},
            {"$match": {"ncrna_exp.RPM": {"$gte": 1}}},
            {"$sort": {"ncrna_exp.RPM": -1}},
        ]
        if args["all"]:
            condition.append(
                {
                    "$project": {
                        "_id": 0,
                        "GeneSymbol": "$ncrna_exp.GeneSymbol",
                        "RPM": "$ncrna_exp.RPM",
                        "class": "$ncrna_exp.ncrna",
                    }
                }
            )
            samplerankexp = list(mongo.db.sample_exp.aggregate(condition))
            return {"samplerankexp": samplerankexp}
        else:
            condition.extend(
                [
                    {
                        "$group": {
                            "_id": "$ncrna_exp.ncrna",
                            "rna_exp": {"$push": "$ncrna_exp.RPM"},
                            "rna_lst": {"$push": "$ncrna_exp.GeneSymbol"},
                        }
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "class": "$_id",
                            "rna_exp_lst": {"$slice": ["$rna_exp", args["size"]]},
                            "rna_sym_lst": {"$slice": ["$rna_lst", args["size"]]},
                        }
                    },
                ]
            )
            samplerankexp = list(mongo.db.sample_exp.aggregate(condition))
            return {"samplerankexp": samplerankexp}


api.add_resource(SampleRankExp, "/samrankexp")


class ncRNASrpExp(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("srp", type=str, required=True)
        parser.add_argument("class", type=str, required=True)
        parser.add_argument("filter", type=str, default="")
        parser.add_argument("sort", type=str, default="desc")
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        sort_option = {"asc": 1, "desc": -1}

        condition = {
            "srp_id": args.srp,
            "class": args["class"],
        }

        if args.filter != "":
            condition["GeneSymbol"] = {"$regex": args.filter, "$options": "i"}

        mcur = mongo.db.srp_exp.find(condition, {"_id": 0}).sort(
            "avg", sort_option[args.sort]
        )
        n_record = mcur.count()
        result_lst = list(mcur.skip(record_skip).limit(record_limit))

        return {"data": result_lst, "n_record": n_record}


api.add_resource(ncRNASrpExp, "/ncrnasrpexp")
