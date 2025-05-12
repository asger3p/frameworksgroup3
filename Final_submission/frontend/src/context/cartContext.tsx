import {
    createContext,
    useState,
    ReactNode,
    useContext,
  } from "react";
  import { CartItem } from "../types/cart"; // importing CartItem type which defines the shape of each cart entry

  
  // first defining the structure and available actions of our cart context
  interface CartContextType {
    items: CartItem[]; // array holding current cart items
    addItem: (item: CartItem) => void; // function to add new items or increase quantity
    removeItem: (index: number) => void;  // function to remove an item completely
    updateQty: (index: number, qty: number) => void; // function to set exact quantity
    clearCart: () => void;  // function to empty the cart
  }
  
  // create context with an initial undefined value so we can detect missing provider
  export const CartContext = createContext<CartContextType | undefined>(undefined);
  
  // provider component that wraps parts of our app needing cart access
  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]); // local state to store cart items

    // adds an item to the cart OR increments quantity if it already exists
    const addItem = (item: CartItem) => {
      setItems((prev) => {
        // check if the item is already in cart (same product + same size)
        const exists = prev.find(i => i.productId === item.productId  && i.size === item.size)
        if (exists) {  // if it exists, map over items and update the matching one's quantity

          return prev.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        // if it doesn't exist, append it to the array
        return [...prev, item];
      });
    };
  
    // removes an item entirely based on its array index
    const removeItem = (index: number) => {
      setItems(prev => prev.filter((_item, i) => i !== index)); // Filter out (remove) the cartItem at the specified index
    };
  
    // updates the quantity of the item at the given index
    const updateQty = (index: number, qty: number) => {
      setItems(prev =>
        prev.map((_item, i) =>
          i === index ? { ..._item, quantity: qty } : _item
        )
      );
    };
  
    // clears all items from the cart
    const clearCart = () => {
      setItems([]);
    };
  
    return ( // providing state and actions to consumer components
      <CartContext.Provider
        value={{ items, addItem, removeItem, updateQty, clearCart }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  // hook to grab the cart easily
  export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) {
      throw new Error("useCart must be used inside a <CartProvider>");
    }
    return ctx;
  };
  