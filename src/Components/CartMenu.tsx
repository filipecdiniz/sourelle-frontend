"use client"

import Image from "next/image";
import { useState } from "react";
import CartOpen from "./CartOpen";

export default function CartMenu() {

    const [isCartOpen, setCartOpen] = useState(false)
    // const [itemsCart, setItemsCart] = useState(0)

    return (
        <div className="">
            <div className="w-4 h-4 left-10 bg-light_red rounded-full text-white text-sm flex items-center justify-center">{0}</div>
            <Image
                src='/cart.png'
                alt="Cart"
                width={25}
                height={25}
                onClick={() => setCartOpen((prev) => !prev)}
            />
            {
                isCartOpen && <CartOpen />
            }
        </div>
    )
}