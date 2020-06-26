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
