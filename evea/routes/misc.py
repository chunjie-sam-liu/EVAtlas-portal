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


class FuncmiRNA(Resource):
    pass


class TCGAsnoRNA(Resource):
    pass

