export interface NFToken {
  index: number;
  collection: number;
  owner: string;
  data: string;
}

export interface PunkNFT extends NFToken {
  sex: 'Female' | 'Male';
  attributes: string[];
  image?: string;
}

export interface Collection {
  owner: string;
  name: string;
  description: string;
  tokenPrefix: string;
  offchainSchema: string;
  sponsor: string;
  unconfirmedSponsor: string;
}
