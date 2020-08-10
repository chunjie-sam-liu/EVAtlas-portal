from flask import Blueprint
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal


misc = Blueprint("misc", __name__)
api = Api(misc)


class TCGAmiRNA(Resource):
    def get(self, mirna):
        condition = {"miRNA_id": mirna}
        output = {"_id": 0}
        mcur = mongo.db.tcga_exp_miRNA.find_one(condition, output)
        return mcur


api.add_resource(TCGAmiRNA, "/tcga_mirna/<string:mirna>")


mir_func_database_fields = {
    "miR_gene_id": fields.String,
    "Pubmed": fields.String(attribute="pubmed_id"),
    "timestamps": fields.String,
    "miRNA id": fields.String(attribute="miRNA_id"),
    "miRNA Function": fields.String(attribute="mir_function"),
}

mir_func_database_list_fields = {
    "mir_func_list": fields.List(fields.Nested(mir_func_database_fields)),
    # "records_num": fields.Integer,
}


class FuncmiRNA(Resource):
    @marshal_with(mir_func_database_list_fields)
    def get(self, mirna):
        condition = {"miRNA_id": mirna}
        output = {"_id": 0}
        mcur = mongo.db.func_miRNA.find(condition, output)
        return {"mir_func_list": list(mcur)}


api.add_resource(FuncmiRNA, "/func_mirna/<string:mirna>")


class TCGAsnoRNA(Resource):
    def get(self, snorna):
        condition = {"snoRNA_id": snorna}
        output = {"_id": 0}
        mcur = mongo.db.tcga_exp_snoRNA.find_one(condition, output)
        return mcur


api.add_resource(TCGAsnoRNA, "/tcga_snorna/<string:snorna>")
