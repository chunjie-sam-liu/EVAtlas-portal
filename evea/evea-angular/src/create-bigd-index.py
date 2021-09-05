#!/usr/bin/env python
# -*- conding:utf-8 -*-
# @AUTHOR: Gui-Yan Xie
# @CONTACT: xieguiyan at hust dot edu dot cn
# @DATE: 2021-09-05 21:52:14
# @DESCRIPTION:

import json
import uuid
from pymongo import MongoClient


db_dict = {
    "id": "EVAtlas",
    "title": "Extracellular Vesicle Atlas",
    "url": "http://bioinfo.life.hust.edu.cn/EVAtlas/",
    "description": "In EVAtlas, we performed a unified read dynamic assignment algorithm (RDAA) considering mismatch and multi-mapping reads to quantify the expression profiles of seven ncRNA types (miRNA, snoRNA, piRNA, snRNA, rRNA, tRNA and Y RNA) in more than 2,030 high-quality small RNA-seq datasets of EV samples from 24 human tissues of different conditions (disease and normal).",
    "basicInfo": "EVAtlas provides four functional modules: (i) browse and compare the distribution of ncRNAs in EVs from 24 conditions and eight sources (plasma, serum, saliva, urine, sperm, breast milk, primary cell and cell line ); (ii) prioritize candidate ncRNAs in condition related tissues based on their expression; (iii) explore the specifically expressed ncRNAs in EVs from 24 conditions; (iv) investigate ncRNA functions, related drugs, target genes and EVs isolation methods.",
    "categories": ["Extracellular vesicles (EVs)", "ncRNAs", "expression profiles", "disease"],
    "species": ["Homo Sapiens"],
    "updatedAt": "2021-06-01",
}


class Mongoncrna:
    __mongo = MongoClient("mongodb://usr:pd@ip:port/dbname")

    def __init__(self, col_name="ncRNA_expr"):
        self.__col_name = col_name

    def get_data(self, output={}, condition={}):
        output["_id"] = 0
        mcur = self.__mongo.EVEA[self.__col_name].find(condition, output, no_cursor_timeout=True)
        return mcur.count()

    def get_ncrnas(self):
        mcur = self.__mongo.EVEA.rna_symbol.find({}, {"_id": 0, "go": 1})
        res = [item["go"] for item in mcur]
        return res


class ENTRY(object):
    def __init__(self, type, title, url):
        self.id = str(uuid.uuid4())
        self.type = type
        self.title = title
        self.url = url
        self.dbId = "EVEA"
        self.updatedAt = "2021-06-01"
        self.description = ""
        self.basicInfo = ""
        self.species = ["Homo Sapiens"]
        self.attrs = {
            "symbol": title,
        }

    def __getattr__(self, attr):
        return self[attr]


def get_entry(it, type="ncRNA ID"):
    if type.startswith("ncRNA"):
        url = f"http://bioinfo.life.hust.edu.cn/EVAtlas/#/rna/detail/{it}"

    e = ENTRY(type, it, url)

    return json.dumps(e.__dict__)


mongo_pea = Mongoncrna()
ncrna_ids = mongo_pea.get_ncrnas()
print(len(ncrna_ids))

with open("/home/xiegy/tmp/index_eva.bs", "w") as fh:
    header = "DB" + "\t" + json.dumps(db_dict) + "\n"
    fh.write(header)

    for it in ncrna_ids:
        line = "ENTRY" + "\t" + get_entry(it=it, type="ncRNA ID") + "\n"

        fh.write(line)
