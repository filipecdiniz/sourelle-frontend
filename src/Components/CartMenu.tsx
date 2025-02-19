"use client";

import { useState } from "react";
import Image from "next/image";
import CartOpen from "./CartOpen";
import { useAppContext } from "@/context/AppContext";

export default function CartMenu() {
  const [isCartOpen, setCartOpen] = useState(false);
  const { itemsInCart } = useAppContext();

  return (
    <div className="">
      <div className="w-5 h-5 left-10 rounded-full bg-red-500 text-white text-sm font-semibold flex items-center justify-center">
        {itemsInCart}
      </div>
      <Image
        src="/cart.png"
        alt="Cart"
        width={25}
        height={25}
        onClick={() => setCartOpen((prev) => !prev)}
      />
      {isCartOpen && <CartOpen />}
    </div>
  );
}
