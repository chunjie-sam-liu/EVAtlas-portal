from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal
from collections import Counter, defaultdict

import os
import re
import sys

stat = Blueprint("stat", __name__)
api = Api(stat)

category_stat_field = {
    "category_stat": fields.Nested(
        {
            "sample_n": fields.Integer,
            "category_type": fields.Nested(
                {"ex_type": fields.String, "tissues": fields.String}
            ),
        }
    ),
    "category_n": fields.Integer,
    "ex_type_lst": fields.List(
        fields.Nested({"sample_n": fields.Integer, "ex_type": fields.String})
    ),
    "tissues_type_lst": fields.List(
        fields.Nested({"sample_n": fields.Integer, "source_type": fields.String})
    ),
}


class CategoryStat(Resource):
    @marshal_with(category_stat_field)
    def get(self):
        sample_category = {}
        category_stat_oj = mongo.db.sample_info.aggregate(
            [
                {
                    "$group": {
                        "_id": {"ex_type": "$ex_type", "tissues": "$tissues"},
                        "sample_n": {"$sum": 1},
                    }
                },
                {"$project": {"_id": 0, "category_type": "$_id", "sample_n": 1}},
            ]
        )
        category_stat_lst = list(category_stat_oj)
        category_n = len(category_stat_lst)
        ex_type_oj = mongo.db.sample_info.aggregate(
            [
                {"$group": {"_id": "$ex_type", "sample_n": {"$sum": 1}}},
                {"$project": {"_id": 0, "ex_type": "$_id", "sample_n": 1}},
            ]
        )
        ex_type_lst = list(ex_type_oj)
        source_type_oj = mongo.db.sample_info.aggregate(
            [
                {"$group": {"_id": "$tissues", "sample_n": {"$sum": 1}}},
                {"$project": {"_id": 0, "source_type": "$_id", "sample_n": 1}},
            ]
        )
        source_type_lst = list(source_type_oj)
        return {
            "category_n": category_n,
            "category_stat": category_stat_lst,
            "ex_type_lst": ex_type_lst,
            "tissues_type_lst": source_type_lst,
        }


api.add_resource(CategoryStat, "/category")

exp_stat_field = {
    "exp_level": fields.List(
        fields.Nested({"exp_flag": fields.String, "count": fields.Integer})
    ),
    "count": fields.Integer,
    "ncRNA": fields.String,
}

ncRNA_stat_field_lst = {"exp_stat_lst": fields.List(fields.Nested(exp_stat_field))}


class SamplesExpStat(Resource):
    @marshal_with(ncRNA_stat_field_lst)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("querys", type=str)
        parser.add_argument("ncRNA_type", type=str)
        parser.add_argument("query_type", type=str)
        args = parser.parse_args()
        query_type = args["query_type"]
        ncRNA_lst = [
            "miRNA",
            "rRNA",
            "tRNA",
            "piRNA",
            "snoRNA",
            "snRNA",
            "pRNA",
            "scRNA",
        ]
        if args["ncRNA_type"]:
            ncRNA_lst = args["ncRNA_type"].strip().split(",")
        query_lst = args["querys"].strip().split(",")
        if query_type != "sample":
            samples_lst = list(
                mongo.db.sample_info.find(
                    {query_type: {"$in": query_lst}}, {"srr_id": 1, "_id": 0}
                )
            )
            query_lst = [z["srr_id"] for z in samples_lst]
        exp_stat_oj = mongo.db.sample_exp.aggregate(
            [
                {"$match": {"srr_id": {"$in": query_lst}}},
                {"$unwind": "$ncrna_exp"},
                {"$match": {"ncrna_exp.ncrna": {"$in": ncRNA_lst}}},
                {
                    "$project": {
                        "_id": 0,
                        "ncrna_exp": 1,
                        "exp_flag": {
                            "$cond": {
                                "if": {"$gte": ["$ncrna_exp.RPM", 10000]},
                                "then": "10000",
                                "else": {
                                    "$cond": {
                                        "if": {"$gte": ["$ncrna_exp.RPM", 1000]},
                                        "then": "1000",
                                        "else": {
                                            "$cond": {
                                                "if": {"$gte": ["$ncrna_exp.RPM", 100]},
                                                "then": "100",
                                                "else": {
                                                    "$cond": {
                                                        "if": {
                                                            "$gte": [
                                                                "$ncrna_exp.RPM",
                                                                10,
                                                            ]
                                                        },
                                                        "then": "10",
                                                        "else": {
                                                            "$cond": {
                                                                "if": {
                                                                    "$gte": [
                                                                        "$ncrna_exp.RPM",
                                                                        1,
                                                                    ]
                                                                },
                                                                "then": "1",
                                                                "else": "0",
                                                            }
                                                        },
                                                    }
                                                },
                                            }
                                        },
                                    }
                                },
                            }
                        },
                    }
                },
                {
                    "$group": {
                        "_id": {"ncrna": "$ncrna_exp.ncrna", "exp_flag": "$exp_flag"},
                        "total": {"$sum": 1},
                    }
                },
                {
                    "$group": {
                        "_id": "$_id.ncrna",
                        "exp_level": {
                            "$push": {"exp_flag": "$_id.exp_flag", "count": "$total"}
                        },
                        "count": {"$sum": "$total"},
                    }
                },
                {"$project": {"_id": 0, "ncRNA": "$_id", "exp_level": 1, "count": 1}},
            ]
        )
        exp_stat_lst = list(exp_stat_oj)
        return {"exp_stat_lst": exp_stat_lst}


api.add_resource(SamplesExpStat, "/samplesexp")


class OverAllMappingDistribution(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("query_type", type=str)
        parser.add_argument("query_item", type=str)
        args = parser.parse_args()
        query_type = args["query_type"]
        query_item = args["query_item"]
        mcur = mongo.db.sample_info.find(
            {query_type: query_item},
            {"_id": 0, "srr_id": 1, "tag_stat": 1, "srr_tag_info": 1},
        )
        return list(mcur)


api.add_resource(OverAllMappingDistribution, "/oa_dist")


class SampleStat(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("tissues", type=str)
        parser.add_argument("ex_type", type=str)
        parser.add_argument("detail", type=int, default=0)
        args = parser.parse_args()
        condition = []
        basic_match = {
            "$match": {"tissues": args["tissues"], "ex_type": args["ex_type"]}
        }
        condition.append(basic_match)
        basic_stat = {
            "$group": {
                "_id": {"disease": "$disease"},
                "projects": {"$addToSet": "$srp_id"},
                "source": {"$addToSet": "$source"},
                "srr_count": {"$sum": 1},
                "srr_map_info": {"$push": "$srr_map_info"},
                "ratio_stat": {"$push": "$ratio_stat"},
                "srr_id": {"$push": "$srr_id"},
            }
        }
        if args["detail"]:
            basic_stat["$group"]["_id"]["material"] = "$material"
        condition.append(basic_stat)
        sample_stats = list(mongo.db.sample_info.aggregate(condition))
        return {"sample_stats": sample_stats}


class SrpShow(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("select", type=str)
        parser.add_argument("query", type=str)
        args = parser.parse_args()
        condition = []
        inner_query_lst = ["tissues", "source"]
        inner_query_lst.remove(args["select"])
        basic_match = {"$match": {args["select"]: args["query"]}}
        condition.append(basic_match)
        basic_stat = {
            "$group": {
                "_id": "$srp_id",
                "ex_type": {"$addToSet": "$ex_type"},
                "disease": {"$addToSet": "$disease"},
                "material": {"$addToSet": "$material"},
                "source": {"$addToSet": "$source"},
                "tissues": {"$addToSet": "$tissues"},
                inner_query_lst[0]: {"$addToSet": "$" + inner_query_lst[0]},
                "pubmed": {"$addToSet": "$pubmed_id"},
                "srr_count": {"$sum": 1},
                "normal_n": {
                    "$sum": {"$cond": [{"$eq": ["$condition", "Normal"]}, 1, 0]}
                },
                "case_n": {
                    "$sum": {"$cond": [{"$eq": ["$condition", "Normal"]}, 0, 1]}
                },
            }
        }
        condition.append(basic_stat)
        srp_lst = list(mongo.db.sample_info.aggregate(condition))
        for i in srp_lst:
            if i["normal_n"] != 0 and i["case_n"] == 0:
                m = i["normal_n"]
                i["normal_n"] = i["case_n"]
                i["case_n"] = m
        return {"srp_lst": srp_lst}


api.add_resource(SrpShow, "/Srplst")


class SrpMapStat(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("srp", type=str)
        args = parser.parse_args()
        condition = []
        basic_match = {"$match": {"srp_id": args["srp"]}}
        stat_para = {
            "$group": {
                "_id": "$condition",
                "srr_count": {"$sum": 1},
                "map_info": {"$push": "$srr_map_info"},
                "srr_id": {"$push": "$srr_id"},
            }
        }
        condition.extend([basic_match, stat_para])
        srp_map_stats = list(mongo.db.sample_info.aggregate(condition))
        return {"srp_stats": srp_map_stats, "srp_id": args["srp"]}


api.add_resource(SrpMapStat, "/srpmapstat")


class SrpRatioStat(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("srp", type=str)
        parser.add_argument("samType", type=str)
        args = parser.parse_args()

        # print(args.samType)
        # print("samType")
        if args.samType == "Control":
            condition = {"$and": [{"srp_id": args.srp}, {"condition": "Normal"}]}
        elif args.samType == "Case":
            condition = {
                "$or": [
                    {"srp_id": args.srp, "condition": "Cancer"},
                    {"srp_id": args.srp, "condition": "cancer"},
                    {"srp_id": args.srp, "condition": "Disease"},
                    {"srp_id": args.srp, "condition": "disease"},
                ]
            }
        output = {
            "_id": 0,
            "srr_tag_info": 1,
            "srr_id": 1,
            "tag_stat": 1,
            "disease": 1,
            "ex_type": 1,
        }
        mcur = mongo.db.sample_info.find(condition, output)
        return list(mcur)

    def get_old(self):
        parser = reqparse.RequestParser()
        parser.add_argument("srp", type=str)
        args = parser.parse_args()
        ncRNA_lst = [
            "miRNA",
            "rRNA",
            "tRNA",
            "piRNA",
            "snoRNA",
            "snRNA",
            "pRNA",
            "scRNA",
        ]
        condition = []
        basic_match = {"$match": {"srp_id": args["srp"]}}
        stat_para = {"$group": {"_id": "$srp_id"}}
        tmp_ratio = {i + "_ratio": {"$push": "$ratio_stat." + i} for i in ncRNA_lst}
        stat_para["$group"].update(tmp_ratio)
        tmp_avg = {i + "_avg": {"$avg": "$ratio_stat." + i} for i in ncRNA_lst}
        stat_para["$group"].update(tmp_avg)
        condition.extend([basic_match, stat_para])
        srp_ratio_stats = list(mongo.db.sample_info.aggregate(condition))
        return {"srp_ratio_stats": srp_ratio_stats}


api.add_resource(SrpRatioStat, "/srpratiostat")


class Cate4Key(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("cate", type=str)
        args = parser.parse_args()

        cate_lst = mongo.db.sample_info.distinct(args["cate"])
        return {"cate": cate_lst}


api.add_resource(Cate4Key, "/catekey")
