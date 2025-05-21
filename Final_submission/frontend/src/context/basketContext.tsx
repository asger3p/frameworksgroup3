import {
    createContext,
    useState,
    ReactNode,
    useContext,
  } from "react";
  import { BasketItem } from "../types/basket"; // importing CartItem type which defines the shape of each cart entry

  
  // first defining the structure and available actions of our cart context
  interface BasketContextType {
    items: BasketItem[]; // array holding current cart items
    addItem: (item: BasketItem) => void; // function to add new items or increase quantity
    removeItem: (index: number) => void;  // function to remove an item completely
    updateQty: (index: number, qty: number) => void; // function to set exact quantity
    clearBasket: () => void;  // function to empty the cart
  }
  
  // create context with an initial undefined value so we can detect missing provider
  export const BasketContext = createContext<BasketContextType | undefined>(undefined);
  
  // provider component that wraps parts of our app needing cart access
  export const BasketProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<BasketItem[]>([]); // local state to store cart items

    // adds an item to the cart OR increments quantity if it already exists
    const addItem = (item: BasketItem) => {
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
    const clearBasket = () => {
      setItems([]);
    };
  
    return ( // providing state and actions to consumer components
      <BasketContext.Provider
        value={{ items, addItem, removeItem, updateQty, clearBasket }}
      >
        {children}
      </BasketContext.Provider>
    );
  };
  
  // hook to grab the cart easily
  export const useBasket = () => {
    const ctx = useContext(BasketContext);
    if (!ctx) {
      throw new Error("useCart must be used inside a <CartProvider>");
    }
    return ctx;
  };
  