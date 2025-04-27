export type CuisineType = 'Indian' | 'Mediterranean' | 'Latin American'  | 'Asian';
export type ProductTypeCategory = 'Whole' | 'Ground' | 'Blend';

export interface Size {
  size: string;
  price: number;
}

export interface Product {
  product_id: string;
  name: string;
  subheading: string;
  description: string;
  image: string;
  cuisine: CuisineType[];
  type: ProductTypeCategory;
  sizes: Size[];
}