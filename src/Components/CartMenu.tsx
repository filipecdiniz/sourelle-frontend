"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { AddProductInCartAPI } from "@/backEndRoutes";
import CartOpen from "./CartOpen";
import Cookies from "js-cookie";

export default function CartMenu() {

    const [isCartOpen, setCartOpen] = useState(false)
    const [itemsCart, setItemsCart] = useState(0)
    // const authToken = Cookies.get("authToken");

    useEffect(() => {
        const updateCartItems = () => {
            const cart = Cookies.get("cart");
            if (cart) {
                const cartProducts = JSON.parse(cart);
                setItemsCart(cartProducts.cartProduct.length);
            }
        };
        updateCartItems();
    }, []);

    return (
        <div className="">
            <div className="w-5 h-5 left-10 rounded-full bg-red-500 text-white text-sm font-semibold flex items-center justify-center">
                {itemsCart}
            </div>
            <Image
                src='/cart.png'
                alt="Cart"
                width={25}
                height={25}
                onClick={() => setCartOpen((prev) => !prev)}
            />
            {isCartOpen && <CartOpen />}
        </div>
    )
}
