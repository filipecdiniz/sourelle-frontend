"use client";

import { ConsumeCartAPI } from "@/backEndRoutes";
import Notification from "@/Components/Notification";
import { useAppContext } from "@/context/AppContext";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductInCart {
    id: number;
    productId: number;
    amount: number;
    product: {
        id: number;
        name: string;
        price: number;
        url: string;
    };
}

export default function CartPage() {
    const { syncCart } = useAppContext();
    const router = useRouter();
    const [productsCart, setProductsCart] = useState<ProductInCart[]>([]);
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });
    const authToken = Cookies.get("authToken");
    const cart = Cookies.get("cart");

    useEffect(() => {
        updateCartItems();
    }, [cart]);

    function updateCartItems() {
        if (cart) {
            const cartProducts = JSON.parse(cart);
            setProductsCart(cartProducts);
            return;
        }
        return;
    }

    function handeCheckout() {
        router.push("carrinho/endereco");
    }

    async function handleRemoveQuantity(productId: number, amount: number) {
        console.log(productId)
        try {
            const response = await fetch(ConsumeCartAPI, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    productId: productId,
                    amount: amount - 1,
                }),
            });
            if (response.ok) {
                const updatedCart = await response.json();

                console.log(updatedCart);
                setProductsCart(updatedCart.cartProduct);
                await syncCart()
                Cookies.set("cart", JSON.stringify(updatedCart.cartProduct));
            } else {
                console.log('Erro no servidor ao atualizar o carrinho.');
                setShowNotification({
                    color: 'bg-red-500',
                    message: 'Erro no servidor ao atualizar o carrinho.',
                    show: true,
                });
            }
        } catch (error) {
            setShowNotification({
                color: 'bg-red-500',
                message: `${error}`,
                show: true,
            });
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
            {!productsCart.length ? (
                <div className="text-center py-10 text-gray-600 text-lg">Carrinho está vazio</div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6">Carrinho de Compras</h2>

                    {/* ITEMS LIST */}
                    <div className="flex flex-col gap-6">
                        {productsCart.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between p-4 border rounded-md shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.product.url}
                                        alt={product.product.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-base truncate max-w-[150px]">
                                            {product.product.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">Qtd: {product.amount}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-base">
                                        <span className="text-sm">R$</span> {product.product.price.toFixed(2)}
                                    </p>
                                    <button
                                        className="text-red-500 text-sm mt-2"
                                        onClick={() => handleRemoveQuantity(product.productId, product.amount)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                    {/* BOTTOM */}
                    <div className="mt-8 border-t pt-6">
                        <div className="flex items-center justify-between text-lg font-semibold">
                            <span>Subtotal</span>
                            <span>
                                R$ {productsCart
                                    .reduce(
                                        (total, product) =>
                                            total + product.product.price * product.amount,
                                        0
                                    )
                                    .toFixed(2)}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">
                            Taxas de entrega calculadas no final.
                        </p>

                        <button
                            className="w-full mt-6 py-3 bg-black text-white rounded-md text-lg hover:bg-gray-800 transition"
                            onClick={handeCheckout}
                        >
                            Fechar Pedido
                        </button>
                    </div>
                </>
            )}

            <Notification
                color={showNotification.color}
                message={showNotification.message}
                show={showNotification.show}
                onClose={() =>
                    setShowNotification((prev) => ({ ...prev, show: false }))
                }
            />
        </div>
    );
}
