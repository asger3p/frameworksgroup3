import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { BasketItem } from "../types/basket";

// 1. Context Interface
interface BasketContextType {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  clearBasket: () => void;
  fetchBasket: (customerId: string) => Promise<void>;
  setCustomer: (customerId: string) => Promise<void>;
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined);

// 2. Helper for fetching product details
async function fetchProductDetails(productId: string): Promise<Omit<BasketItem, "quantity">> {
  const res = await fetch(`http://localhost:3000/products/${productId}`);
  if (!res.ok) throw new Error("Product not found");

  const product = await res.json();

  return {
    productId: product.product_id,
    name: product.name,
    price: product.price,
    size: product.size || "default",
    imageUrl: product.imageUrl,
  };
}

// 3. BasketProvider
export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [customerId, setCustomerId] = useState<string | null>(null);

  // 4. Sync helper moved *inside* so it can access customerId
  const syncBasketToServer = async (updatedItems: BasketItem[]) => {
    if (!customerId) {
      localStorage.setItem("guest_basket", JSON.stringify(updatedItems));
      return;
    }

    try {
      await fetch(`http://localhost:3000/basket/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: updatedItems.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity,
          })),
        }),
      });
    } catch (err) {
      console.error("Failed to sync basket to backend", err);
    }
  };

  // 4a. Transfer guest basket to backend for a customerId (called on login/register)
  const transferGuestBasketToCustomer = async (newCustomerId: string) => {
    const guestBasketStr = localStorage.getItem("guest_basket");
    if (!guestBasketStr) return;

    const guestItems: BasketItem[] = JSON.parse(guestBasketStr);

    try {
      await fetch(`http://localhost:3000/basket/${newCustomerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: guestItems.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      // Clear guest basket localStorage after transferring
      localStorage.removeItem("guest_basket");
    } catch (error) {
      console.error("Failed to transfer guest basket", error);
    }
  };

  // 5. Load basket on mount - only loads guest basket locally, no backend fetch here
  useEffect(() => {
    if (!customerId) {
      const localItems = localStorage.getItem("guest_basket");
      if (localItems) {
        setItems(JSON.parse(localItems));
      }
    }
  }, [customerId]);

  // 6. Fetch basket from backend
  const fetchBasket = async (custId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/basket/${custId}`);

      if (!res.ok) {
        console.warn("Could not load basket");
        setItems([]);
        return;
      }

      const basket = await res.json();
      setCustomerId(basket.customer_id);

      const enrichedItems = await Promise.all(
        basket.items.map(async (item: { product_id: string; quantity: number }) => {
          const productInfo = await fetchProductDetails(item.product_id);
          return {
            ...productInfo,
            quantity: item.quantity,
          };
        })
      );

      setItems(enrichedItems);
    } catch (err) {
      console.error("Failed to fetch basket", err);
    }
  };

  // 7. Set customer and load basket + transfer guest basket if present
  const setCustomer = async (newCustomerId: string) => {
    await transferGuestBasketToCustomer(newCustomerId);
    await fetchBasket(newCustomerId);
    setCustomerId(newCustomerId);
  };

  // 8. Add item
  const addItem = (item: BasketItem) => {
    setItems((prev) => {
      const updated = (() => {
        const exists = prev.find(
          (i) => i.productId === item.productId && i.size === item.size
        );
        if (exists) {
          return prev.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        return [...prev, item];
      })();

      syncBasketToServer(updated);
      return updated;
    });
  };

  // 9. Remove item
const removeItem = async (index: number) => {
  const productId = items[index].productId;

  if (!customerId) {
    // Guest user: update local storage and state
    setItems((prev) => {
      const updated = prev.filter((_item, i) => i !== index);
      localStorage.setItem("guest_basket", JSON.stringify(updated));
      return updated;
    });
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/basket/${customerId}/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove product');
    }

    // Update local state by removing the item
    setItems((prev) => prev.filter((_item, i) => i !== index));
  } catch (error) {
    console.error('Failed to remove item from basket', error);
  }
};


  // 10. Update quantity
  const updateQty = (index: number, qty: number) => {
    setItems((prev) => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, quantity: qty } : item
      );
      syncBasketToServer(updated);
      return updated;
    });
  };

  // 11. Clear basket
  const clearBasket = () => {
    setItems([]);
    syncBasketToServer([]);
  };

  // 12. Context provider
  return (
    <BasketContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearBasket, fetchBasket, setCustomer }}
    >
      {children}
    </BasketContext.Provider>
  );
};

// 13. Hook to consume basket
export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) {
    throw new Error("useBasket must be used inside a <BasketProvider>");
  }
  return ctx;
};
