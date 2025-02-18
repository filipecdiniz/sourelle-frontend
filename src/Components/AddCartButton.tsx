import { AddProductInCartAPI } from "@/backEndRoutes";
import { useState } from "react";
import Cookies from "js-cookie";
import Notification from "./Notification";

interface AddProductToCart {
    productId: number;
    amount: number;
}

export default function AddCartButton({ productId, amount }: AddProductToCart) {
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    async function addItemCart(productId: number, amount: number) {
        setIsLoading(true);

        try {
            const response = await fetch(`${AddProductInCartAPI}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    amount,
                }),
            });

            if (!response.ok) {
                console.error("Erro ao adicionar produto ao carrinho.");
                setIsLoading(false);
                return;
            }

            const cart = await response.json();
            Cookies.set("cart", JSON.stringify(cart));
            setShowNotification(true); // Exibir notificação
        } catch (error) {
            console.error("Erro ao adicionar item ao carrinho:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => addItemCart(productId, amount)}
                className={`w-36 text-sm rounded-3xl ring-1 py-2 px-4 transition-all ${isLoading
                    ? "bg-light_red text-white cursor-not-allowed"
                    : "ring-light_red text-light_red hover:bg-light_red hover:text-white"
                    }`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="flex justify-center items-center space-x-2">
                        <span className="loader animate-spin border-2 border-t-transparent border-white w-4 h-4 rounded-full"></span>
                        <span>Adicionando...</span>
                    </span>
                ) : (
                    "Comprar"
                )}
            </button>

            <Notification
                color="bg-light_red"
                message="Produto adicionado ao carrinho!"
                show={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </>
    );
}
