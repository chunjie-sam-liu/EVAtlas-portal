export interface SpeTissue {
  ncrna: Ncrna[];
  ex_type: string;
  tissue: string;
}

export interface Ncrna {
  class: string;
  GeneSymbol: string[];
}
