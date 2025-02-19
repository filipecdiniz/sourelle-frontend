"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProductInCartOpen from "./Product/ProductInCartOpen";
import { useAppContext } from "@/context/AppContext";

interface ProductInCart {
    id: number;
    productID: number;
    amount: number;
    product: {
        id: number;
        name: string;
        price: number;
        url: string;
    };
}

export default function CartOpen() {

    const [productsCart, setProductsCart] = useState<ProductInCart[]>([]);
    const [visibleItems, setVisibleItems] = useState<number>(4);
    const cart = Cookies.get("cart");
    const cartItems = productsCart.length > 0;

    useEffect(() => {
        console.log(cart)
        updateCartItems();
    }, [cart]);

    function updateCartItems() {

        if (cart) {
            const cartProducts = JSON.parse(cart);
            console.log(cartProducts)
            setProductsCart(cartProducts);
            console.log(`intern: ${productsCart}`)
        }
        console.log(`fora: ${productsCart}`)

    };


    const handleLoadMore = () => {
        setVisibleItems(productsCart.length);
    };

    return (
        <div className="w-[350px] max-w-full absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white right-4 flex flex-col gap-6 z-20 overflow-x-hidden">
            {!cartItems ? (
                <div className="">Carrinho está vazio</div>
            ) : (
                <>
                    <h2 className="text-xl">Carrinho</h2>
                    {/* ITEMS LIST */}
                    <div className="flex flex-col gap-8 max-h-96 overflow-y-auto">
                        {productsCart.slice(0, visibleItems).map((product) => (
                            <ProductInCartOpen
                                key={product.id}
                                name={product.product.name}
                                value={product.product.price}
                                amount={product.amount}
                                src={product.product.url}
                            />
                        ))}
                    </div>

                    {visibleItems < productsCart.length && (
                        <button
                            onClick={handleLoadMore}
                            className="mt-4 py-2 px-4 rounded-md bg-gray-200 text-gray-700 text-sm"
                        >
                            Ver mais
                        </button>
                    )}

                    {/* BOTTOM */}
                    <div className="">
                        <div className="flex items-center justify-between font-semibold">
                            <span className="">Subtotal</span>
                            <span className="">R$ {productsCart.reduce((total, product) => total + product.product.price * product.amount, 0).toFixed(2)}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">Taxas de entrega calculadas no final.</p>

                        <div className="flex justify-between text-sm">
                            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">Ver Carrinho</button>
                            <button className="rounded-md py-3 px-4 bg-black text-white">Fechar Pedido</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
