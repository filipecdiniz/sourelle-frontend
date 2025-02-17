"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Importando usePathname

export default function Menu() {
    const [menuActive, setMenuActive] = useState(false);
    const pathname = usePathname(); // Obtém a rota atual

    // Fecha o menu ao mudar de rota
    useEffect(() => {
        setMenuActive(false);
    }, [pathname]); // Sempre que `pathname` mudar, fecha o menu

    return (
        <div className="relative">
            <button onClick={() => setMenuActive((state) => !state)}>
                <Image src="/menu.png" alt="Menu" width={28} height={28} />
            </button>

            {menuActive && (
                <div className="absolute left-0 top-full w-[150px] bg-white/95 shadow-md z-50 flex flex-col items-center py-4 transition-all duration-300">
                    {[
                        { label: "Início", href: "/" },
                        { label: "Anéis", href: "/categoria/Anéis" },
                        { label: "Pulseiras", href: "/categoria/Pulseiras" },
                        { label: "Brincos", href: "/categoria/Brincos" },
                        { label: "Perfil", href: "/perfil" },
                        { label: "Pedidos", href: "/pedidos" },
                        { label: "Fazer Login", href: "/login", highlight: true },
                        { label: "Criar Conta", href: "/register", highlight: true },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`w-full text-center text-gray-800 text-lg py-3 hover:bg-gray-100 transition-colors ${
                                item.highlight ? "underline decoration-red-500" : ""
                            }`}
                            onClick={() => setMenuActive(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
