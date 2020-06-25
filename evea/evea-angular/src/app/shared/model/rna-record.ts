export interface RnaRecord {
  GeneSymbol: string;
  position: string;
  sampleCount?: number;
  diseaseCount?: number;
  seq?: string;
}
