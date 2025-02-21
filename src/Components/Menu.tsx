"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/AppContext";

export default function Menu() {
    const [menuActive, setMenuActive] = useState(false);
    const pathname = usePathname();
    const { setItemsInCart, syncCart } = useAppContext();
    const authToken = Cookies.get("authToken");
    const [userType, setUserType] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (authToken && authToken !== undefined) {
            const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
            setUserType(decodedToken.typeUser);
        }
    }, [authToken]);

    useEffect(() => {
        setMenuActive(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleLogout() {
        Cookies.remove("authToken");
        Cookies.remove("cart");
        setItemsInCart(0);
        await syncCart();
    }

    const menuItems = [
        { label: "Início", href: "/" },
        { label: "Anéis", href: "/categoria/Anéis" },
        { label: "Pulseiras", href: "/categoria/Pulseiras" },
        { label: "Brincos", href: "/categoria/Brincos" },
        ...(authToken
            ? [
                  { label: "Perfil", href: "/perfil" },
                  { label: "Pedidos", href: "/pedidos" },
                  ...(userType === 2 ? [{ label: "Admin", href: "/admin" }] : []), // Se for admin, adicionar a opção Admin
                  { label: "Sair", href: "/login", onClick: handleLogout },
              ]
            : [
                  { label: "Fazer Login", href: "/login", highlight: true },
                  { label: "Criar Conta", href: "/register", highlight: true },
              ]),
    ];

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setMenuActive((state) => !state)}>
                <Image src="/menu.png" alt="Menu" width={28} height={28} />
            </button>

            {menuActive && (
                <div className="absolute left-0 top-full w-[150px] bg-white/95 shadow-md z-50 flex flex-col items-center py-4 transition-all duration-300">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`w-full text-center text-gray-800 text-lg py-3 hover:bg-gray-100 transition-colors ${
                                item.highlight ? "underline decoration-red-500" : ""
                            }`}
                            onClick={
                                item.onClick
                                    ? () => {
                                          item.onClick();
                                          setMenuActive(false);
                                      }
                                    : () => setMenuActive(false)
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
