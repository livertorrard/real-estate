export type QueryOptionsProduct = {
  categoryIds: string;
  arrayCategoryIds?: string[];
  fromPrice: number;
  toPrice: number;
  fromSize: number;
  toSize: number;
  type: string;
  sort: string;
};
