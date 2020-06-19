from flask import Blueprint, render_template
from evea.db import mongo
from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

import os
import re
import sys

drug = Blueprint('drug', __name__)
api = Api(drug)


mir_drug_database_fields = {
    "FDA" : fields.String,
    "Detection method " : fields.String,
    "Reference" : fields.String,
    "CID" : fields.String,
    "miRBase" : fields.String,
    "small melocule" : fields.String,
    "Support" : fields.String,
    "Detection method":fields.String,
    "DB" : fields.String,
    "mirna" : fields.String(attribute="miRNA"),
    "Year" : fields.String,
    "PMID" : fields.String,
    "Expression pattern of miRNA" : fields.String,
    "Species" : fields.String,
    "Condition" : fields.String
}

mir_drug_database_list_fields = {
    "mir_drug_list":fields.List(fields.Nested(mir_drug_database_fields)),
    "records_num":fields.Integer
}

class DrugDB(Resource):
    @marshal_with(mir_drug_database_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna",type = str)
        args = parser.parse_args()
        result = []
        miRNA = args["mirna"][4:]
        if miRNA:
            result = list(mongo.db.mir2drug_db.find({"mirna":miRNA}))
            if len(result) == 0:
                if "-3p" in miRNA or "-5p" in miRNA:
                    miRNA = miRNA[:-3]
                    result = list(mongo.db.mir2drug_db.find({"mirna":miRNA}))
                    if len(result) == 0:
                        miRNA = miRNA+"*"
                        result = list(mongo.db.mir2drug_db.find({"mirna":miRNA}))
        return {"mir_drug_list":result,"records_num":len(result)}
api.add_resource(DrugDB,"/db")


