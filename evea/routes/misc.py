from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, marshal
from flask_restful import reqparse


misc = Blueprint("misc", __name__)
api = Api(misc)


mir_tcga_database_fields = {
    "KIRC_normal": fields.Float,
    "THYM_normal": fields.Float,
    "KIRC_case": fields.Float,
    "UVM_case": fields.Float,
    "THCA_normal": fields.Float,
    "ESCA_normal": fields.Float,
    "BLCA_normal": fields.Float,
    "SKCM_normal": fields.Float,
    "READ_case": fields.Float,
    "BRCA_normal": fields.Float,
    "LGG_normal": fields.Float,
    "KIRP_normal": fields.Float,
    "SKCM_case": fields.Float,
    "HNSC_normal": fields.Float,
    "ESCA_case": fields.Float,
    "THYM_case": fields.Float,
    "BRCA_case": fields.Float,
    "STAD_normal": fields.Float,
    "CHOL_case": fields.Float,
    "PRAD_normal": fields.Float,
    "LUAD_normal": fields.Float,
    "LIHC_case": fields.Float,
    "THCA_case": fields.Float,
    "UCS_case": fields.Float,
    "CHOL_normal": fields.Float,
    "ACC_case": fields.Float,
    "KICH_normal": fields.Float,
    "DLBC_normal": fields.Float,
    "CESC_normal": fields.Float,
    "miRNA_id": fields.String,
    "UCEC_normal": fields.Float,
    "READ_normal": fields.Float,
    "COAD_normal": fields.Float,
    "GBM_case": fields.Float,
    "TGCT_case": fields.Float,
    "COAD_case": fields.Float,
    "OV_normal": fields.Float,
    "FPPP_normal": fields.Float,
    "CESC_case": fields.Float,
    "SARC_normal": fields.Float,
    "LIHC_normal": fields.Float,
    "LUAD_case": fields.Float,
    "OV_case": fields.Float,
    "TGCT_normal": fields.Float,
    "KICH_case": fields.Float,
    "HNSC_case": fields.Float,
    "LAML_case": fields.Float,
    "DLBC_case": fields.Float,
    "MESO_case": fields.Float,
    "PRAD_case": fields.Float,
    "BLCA_case": fields.Float,
    "LUSC_normal": fields.Float,
    "UCS_normal": fields.Float,
    "ACC_normal": fields.Float,
    "KIRP_case": fields.Float,
    "LGG_case": fields.Float,
    "UVM_normal": fields.Float,
    "PAAD_normal": fields.Float,
    "LAML_normal": fields.Float,
    "PCPG_normal": fields.Float,
    "LUSC_case": fields.Float,
    "FPPP_case": fields.Float,
    "MESO_normal": fields.Float,
    "STAD_case": fields.Float,
    "PAAD_case": fields.Float,
    "UCEC_case": fields.Float,
    "GBM_normal": fields.Float,
    "PCPG_case": fields.Float,
    "SARC_case": fields.Float,
}

mir_tcga_database_list_fields = {
    "mir_tcga_list": fields.List(fields.Nested(mir_tcga_database_fields))
    # "records_num": fields.Integer,
}


class TCGAmiRNA(Resource):
    @marshal_with(mir_tcga_database_list_fields)
    def get(self, mirna):
        condition = {"miRNA_id": mirna}
        output = {"_id": 0}
        mcur = mongo.db.tcga_exp_miRNA.find(condition, output)
        return {"mir_tcga_list": list(mcur)}


api.add_resource(TCGAmiRNA, "/tcga_mirna/<string:mirna>")


mir_func_database_fields = {
    "miR_gene_id": fields.String,
    "pubmed_id": fields.String,
    "timestamps": fields.String,
    "miRNA_id": fields.String,
    "mir_function": fields.String,
}

mir_func_database_list_fields = {
    "mir_func_list": fields.List(fields.Nested(mir_func_database_fields)),
    "records_num": fields.Integer,
}


class FuncmiRNA(Resource):
    @marshal_with(mir_func_database_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna", type=str, required=True)
        parser.add_argument("filter", type=str, default="")
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=5)
        args = parser.parse_args()

        record_skip = args.page * args.size
        record_limit = args.size

        condition = {"miRNA_id": args.mirna}
        if args.filter != "":
            condition["mir_function"] = {"$regex": args.filter, "$options": "i"}

        print("test-condition---------------------->")
        print(condition)
        output = {"_id": 0}
        mcur = mongo.db.func_miRNA.find(condition, output)
        n_record = mcur.count()
        return {
            "mir_func_list": list(mcur.skip(record_skip).limit(record_limit)),
            "n_record": n_record,
        }


api.add_resource(FuncmiRNA, "/func_mirna/filter")


class TCGAsnoRNA(Resource):
    def get(self, snorna):
        condition = {"snoRNA_id": snorna}
        output = {"_id": 0}
        mcur = mongo.db.tcga_exp_snoRNA.find_one(condition, output)
        return mcur


api.add_resource(TCGAsnoRNA, "/tcga_snorna/<string:snorna>")
