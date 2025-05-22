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
  cuisine: string[];
  type: string;     
  sizes: Size[];
}
