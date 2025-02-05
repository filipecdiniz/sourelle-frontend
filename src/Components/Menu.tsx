"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {

    const [menuActive, setMenuActive] = useState(false)

    return (
        <div className="">
            <Image
                src='/menu.png'
                alt=""
                width={22}
                height={22}
                onClick={() => setMenuActive((state) => !state)}
            /> {
                menuActive && (
                    <div className={`absolute bg-sourelle_main_color text-white left-0 top-20 w-full h-[calc(100vh-210px)] flex flex-col items-center gap-8 text-xl z-10 ${menuActive ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Inicio</Link>
                        </div>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Mais Vendidos</Link>
                        </div>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Alianças</Link>
                        </div>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Pulseiras</Link>
                        </div>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Brincos</Link>
                        </div>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Pedidos</Link>
                        </div>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Fazer Login</Link>
                        </div>
                        <div className="border-b-2 w-[40%] h-10 justify-center items-center text-center">
                            <Link href='/'>Criar conta</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}