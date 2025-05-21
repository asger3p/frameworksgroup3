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
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined);

// 2. Helper for fetching product details
async function fetchProductDetails(productId: string): Promise<Omit<BasketItem, 'quantity'>> {
  const res = await fetch(`/api/products/${productId}`);
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
      await fetch(`/api/basket/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: updatedItems.map(item => ({
            product_id: item.productId,
            quantity: item.quantity,
          })),
        }),
      });
    } catch (err) {
      console.error("Failed to sync basket to backend", err);
    }
  };

  // 5. Load basket on mount
  useEffect(() => {
    const storedId = localStorage.getItem("customerId");
    if (storedId) {
      fetchBasket(storedId);
    } else {
      const localItems = localStorage.getItem("guest_basket");
      if (localItems) {
        setItems(JSON.parse(localItems));
      }
    }
  }, []);

  // 6. Fetch basket from backend
  const fetchBasket = async (customerId: string) => {
    try {
      const res = await fetch(`/api/basket/${customerId}`);

      if (!res.ok) {
        console.warn("Could not load basket");
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

  // 7. Add item
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

  // 8. Remove item
  const removeItem = (index: number) => {
    setItems((prev) => {
      const updated = prev.filter((_item, i) => i !== index);
      syncBasketToServer(updated);
      return updated;
    });
  };

  // 9. Update quantity
  const updateQty = (index: number, qty: number) => {
    setItems((prev) => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, quantity: qty } : item
      );
      syncBasketToServer(updated);
      return updated;
    });
  };

  // 10. Clear basket
  const clearBasket = () => {
    setItems([]);
    syncBasketToServer([]);
  };

  // 11. Context provider
  return (
    <BasketContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearBasket, fetchBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

// 12. Hook to consume basket
export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) {
    throw new Error("useBasket must be used inside a <BasketProvider>");
  }
  return ctx;
};
