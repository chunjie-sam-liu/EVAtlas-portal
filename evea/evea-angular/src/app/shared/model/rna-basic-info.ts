export interface RnaBasicInfo {
  chromosome: string;
  start: number;
  end: number;
  accession?: string;
  sequence?: string;
  premirna?: string;
  pre_acc?: string;
  pre_chr?: string;
  pre_start?: number;
  pre_end?: number;
  pre_seq?: string;
  family?: string;
}
