export interface BasketItem { // Defines a “contract” for a single item in the cart. Any object we read as a cart entry must have productId, name, price, quantity, and image
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  }
  
  export interface BasketState { // Defines the overall cart shape: an object with an items array, each element of which must conform to the CartItem interface.
    items: BasketItem[];
  }