"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { ConsumeCartAPI } from "@/backEndRoutes";
import CartOpen from "./CartOpen";
import Cookies from "js-cookie";

export default function CartMenu() {

    const [isCartOpen, setCartOpen] = useState(false)
    const [itemsCart] = useState(0)
    const authToken = Cookies.get("authToken");

    useEffect(() => {
        getCartOptionsFromUser()
    })

    async function getCartOptionsFromUser() {
        try {
            const response = await fetch(`${ConsumeCartAPI}`, {
                method: 'GET',
                headers: {
                    Authorization: `Baerer ${authToken}`,
                }
            })
            if(response.status === 404) return 
            if(response) {
                
            }
            return
        } catch (error) {
            console.log(error)
            return
        }
    }

    return (
        <div className="">
            <div className="w-4 h-4 left-10 bg-light_red rounded-full text-white text-sm flex items-center justify-center">{itemsCart}</div>
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