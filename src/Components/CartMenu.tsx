"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CartOpen from "./CartOpen";
import { useAppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";

export default function CartMenu() {
  const [isCartOpen, setCartOpen] = useState(false);
  const { itemsInCart } = useAppContext();
  const cartMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Hook para monitorar mudanças de rota

  function handleClickOutside(event: MouseEvent) {
    if (cartMenuRef.current && !cartMenuRef.current.contains(event.target as Node)) {
      setCartOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCartOpen(false);
  }, [pathname]);

  return (
    <div ref={cartMenuRef}>
      <div className="w-5 h-5 left-10 rounded-full bg-red-500 text-white text-sm font-semibold flex items-center justify-center">
        {itemsInCart}
      </div>
      {/* <Image
        src="/cart_power.svg"
        alt="Cart"
        width={25}
        height={25}
        onClick={() => setCartOpen((prev) => !prev)}
        className="cursor-pointer"
      /> */}
      <Image
        src="/Imagem1.svg"
        alt="Cart"
        width={38}
        height={35}
        onClick={() => setCartOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {isCartOpen && <CartOpen />}
    </div>
  );
}
