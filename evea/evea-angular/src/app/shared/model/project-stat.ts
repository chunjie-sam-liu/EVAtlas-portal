export interface ProjectStat {
  _id: string;
  miRNA_ratio: number[];
  rRNA_ratio: number[];
  tRNA_ratio: number[];
  piRNA_ratio: number[];
  snoRNA_ratio: number[];
  snRNA_ratio: number[];
  pRNA_ratio: number[];
  scRNA_ratio: number[];
  miRNA_avg: number;
  rRNA_avg: number;
  tRNA_avg: number;
  piRNA_avg: number;
  snoRNA_avg: number;
  snRNA_avg: number;
  pRNA_avg: number;
  scRNA_avg: number;
}
