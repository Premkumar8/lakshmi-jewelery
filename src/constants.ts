import { Product } from "./types";

export const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: "Temple Gold Necklace", 
    price: 145000, 
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000", 
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000"
    ],
    category: 'Gold', 
    weight: '42.5g', 
    rating: 4.9 
  },
  { 
    id: '2', 
    name: "Diamond Stud Earrings", 
    price: 85000, 
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=1000", 
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1535633302703-b0703af2953a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=1000"
    ],
    category: 'Diamond', 
    weight: '2.1g', 
    rating: 4.8 
  },
  { 
    id: '3', 
    name: "Antique Gold Bangle", 
    price: 92000, 
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000", 
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000"
    ],
    category: 'Gold', 
    weight: '28.0g', 
    rating: 5.0 
  },
  { 
    id: '4', 
    name: "Silver Filigree Drops", 
    price: 4500, 
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=1000", 
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1602173574820-98193ad9000a?auto=format&fit=crop&q=80&w=1000"
    ],
    category: 'Silver', 
    weight: '12.4g', 
    rating: 4.7 
  },
];
