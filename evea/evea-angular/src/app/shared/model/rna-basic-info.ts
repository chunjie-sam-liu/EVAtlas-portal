export interface RnaBasicInfo {
  GeneSymbol: string;
  chr: string;
  start: string;
  end: string;
  strand: string;
  loci_list?: LociList[];
  seq: string;
  source: string;
  pre: string;
  query_url: string;
}

export interface LociList {
  chr: string;
  start: string;
  end: string;
  strand: string;
}
