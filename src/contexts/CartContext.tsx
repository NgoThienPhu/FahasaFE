import React, { useContext, useMemo, useEffect } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("cart");
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) return [];
      return parsed.map((it) => ({
        productId: String(it.productId),
        quantity: Number(it.quantity) || 0,
      })).filter((it) => it.productId && it.quantity > 0);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (productId: string, quantity: number = 1) => {
    if (!productId) return;
    setItems((prev) => {
      const existing = prev.find((it) => it.productId === productId);
      if (existing) {
        return prev.map((it) =>
          it.productId === productId ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [
        ...prev,
        {
          productId,
          quantity,
        },
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((it) => it.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        return acc + item.quantity;
      },
      0
    );
  }, [items]);

  const value: CartContextType = {
    items,
    totalCount,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart phải được sử dụng bên trong CartProvider");
  }
  return ctx;
};

