import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { BasketItem } from "../types/basket";

interface BasketContextType {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  clearBasket: () => void;
  fetchBasket: (customerId: string) => Promise<void>;
  setCustomer: (customerId: string | null) => Promise<void>;
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined);

async function fetchProductDetails(productId: string, size: string) {
  const res = await fetch(`http://localhost:3000/products/${productId}`);
  if (!res.ok) throw new Error("Product not found");

  const product = await res.json();

  const sizeObj = product.sizes.find((s: { size: string }) => s.size === size) || product.sizes[0];

  return {
    productId: product.product_id,
    name: product.name,
    size: sizeObj.size,
    price: sizeObj.price,
    imageUrl: product.image,
  };
}

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [customerId, setCustomerId] = useState<string | null>(null);


  const syncBasketToServer = async (updatedItems: BasketItem[]) => {
    if (!customerId) {
      localStorage.setItem("guest_basket", JSON.stringify(updatedItems));
      return;
    }
    try {
      await fetch(`http://localhost:3000/basket/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: updatedItems.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity,
            size: item.size,
          })),
        }),
      });
    } catch (err) {
      console.error("Failed to sync basket to backend", err);
    }
  };

  const transferGuestBasketToCustomer = async (newCustomerId: string) => {
    const guestBasketStr = localStorage.getItem("guest_basket");
    if (!guestBasketStr) return;

    const guestItems: BasketItem[] = JSON.parse(guestBasketStr);

    try {
      await fetch(`http://localhost:3000/basket/${newCustomerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: guestItems.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity,
            size: item.size,
          })),
        }),
      });

      localStorage.removeItem("guest_basket");
    } catch (error) {
      console.error("Failed to transfer guest basket", error);
    }
  };

  useEffect(() => {
    if (!customerId) {
      const localItems = localStorage.getItem("guest_basket");
      if (localItems) setItems(JSON.parse(localItems));
    }
  }, [customerId]);

  const fetchBasket = async (custId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/basket/${custId}`);

      if (!res.ok) {
        setItems([]);
        return;
      }

      const basket = await res.json();
      setCustomerId(basket.customer_id);

      const enrichedItems = await Promise.all(
        basket.items.map(
          async (item: { product_id: string; quantity: number; size: string }) => {
            const productInfo = await fetchProductDetails(item.product_id, item.size);
            return {
              ...productInfo,
              quantity: item.quantity,
            };
          }
        )
      );

      setItems(enrichedItems);
    } catch (err) {
      console.error("Failed to fetch basket", err);
    }
  };

const setCustomer = async (newCustomerId: string | null) => {
  if (!newCustomerId) {
    // User logged out or guest — clear basket state and localStorage
    setItems([]);
    setCustomerId(null);
    localStorage.removeItem("guest_basket");
    return;
  }

  await transferGuestBasketToCustomer(newCustomerId);
  await fetchBasket(newCustomerId);
  setCustomerId(newCustomerId);
};

  const addItem = (item: BasketItem) => {
    setItems((prev) => {
      const exists = prev.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      const updated = exists
        ? prev.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, item];

      syncBasketToServer(updated);
      return updated;
    });
  };

  const removeItem = async (index: number) => {
  const itemToRemove = items[index];

  if (!customerId) {
    setItems((prev) => {
      const updated = prev.filter((_item, i) => i !== index);
      localStorage.setItem("guest_basket", JSON.stringify(updated));
      return updated;
    });
    return;
  }

  const { productId, size } = itemToRemove;

  try {
    const response = await fetch(
      `http://localhost:3000/basket/${customerId}/${productId}?size=${encodeURIComponent(size)}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Failed to remove product");

    setItems((prev) => prev.filter((_item, i) => i !== index));
  } catch (error) {
    console.error("Failed to remove item from basket", error);
  }
};

const updateQty: (index: number, qty: number) => void = (index, qty) => {
  setItems((prev) => {
    const updated = prev.map((item, i) =>
      i === index ? { ...item, quantity: qty } : item
    );
    syncBasketToServer(updated);
    return updated;
  });
};

const clearBasket = async () => {
  setItems([]);
  localStorage.removeItem("guest_basket");

  if (!customerId) return;

  try {
    await fetch(`http://localhost:3000/basket/${customerId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to clear basket in backend", error);
  }
};

  return (
    <BasketContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearBasket, fetchBasket, setCustomer }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used inside a <BasketProvider>");
  return ctx;
};
