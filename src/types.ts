export type ShopType = {
  active: number;
  cashbackRates: { amount: number; type: string; description: string }[];
  categories: { id: string; name: string }[];
  complainable: boolean;
  createdAt: string;
  createdAtTimestamp: number;
  description: string;
  id: string;
  important: string;
  isExtensionVisible: boolean;
  isFavorite: boolean;
  link: string;
  logo: string;
  maximumCashback: number;
  maximumCashbackType: string;
  minimumCashback: number;
  minimumCashbackType: "%";
  name: string;
  popularity: 0;
  similarShops: any[];
  tags: any[];
  updatedAt: string;
  updatedAtTimestamp: number;
  vouchers: any[];
};

export type PaginationType = {
  currentPage: number;
  numberOfPages: number;
  numberOfResults: number;
};
