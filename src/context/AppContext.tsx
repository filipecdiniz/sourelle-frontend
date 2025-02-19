"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { ConsumeCartAPI } from "@/backEndRoutes";

interface AppContextType {
    itemsInCart: number;
    setItemsInCart: (count: number) => void;
    syncCart: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    // just the number of items in cart.
    const [itemsInCart, setItemsInCart] = useState<number>(0);

    useEffect(() => {
        initializeCart();
    }, []);

    async function initializeCart() {
        const cart = Cookies.get("cart");
        if (cart) {
            const parsedCart = JSON.parse(cart);
            setItemsInCart(parsedCart.length || 0);
        }
    }

    async function syncCart() {
        const authToken = Cookies.get("authToken");
        if (authToken) {
            try {
                const response = await fetch(`${ConsumeCartAPI}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (response.status === 200) {
                    const cart = await response.json();
                    Cookies.set("cart", JSON.stringify(cart.cartProduct));
                    setItemsInCart(cart.countProducts);
                    return
                }
                Cookies.remove("cart");
                return

            } catch (error) {
                console.error("Erro ao sincronizar carrinho:", error);
            }
        }
    }

    return (
        <AppContext.Provider value={{ itemsInCart, setItemsInCart, syncCart }}>
            {children}
        </AppContext.Provider>
    );
};
