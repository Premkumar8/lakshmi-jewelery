export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: 'Gold' | 'Diamond' | 'Silver' | 'Platinum' | 'Coins';
  weight?: string;
  rating?: number;
}

export interface MetalRate {
  metal: string;
  purity: string;
  rate: number;
  change: number;
}
