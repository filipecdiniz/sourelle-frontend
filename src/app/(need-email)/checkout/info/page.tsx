"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ProductInCart } from "@/interfaces/ProductInCart";

export default function CheckoutInfo() {

    const [productsCart, setProductsCart] = useState<ProductInCart[]>([]);
    const [formUser, setFormUser] = useState({
        firstName: "",
        middleName: "",
        email: "",
        number: "",
        cpf: "",
    });
    const [cupomPercentage, setCupomPercentage] = useState(0);

    const cartCookies = Cookies.get('cart');
    const userCookies = Cookies.get('user');
    const cupomCookies = Cookies.get('cupom');

    useEffect(() => {
        if (cartCookies && userCookies) {
            setProductsCart(JSON.parse(cartCookies));
            setFormUser(JSON.parse(userCookies));
            if (cupomCookies) {
                setCupomPercentage(Number(cupomCookies));
            }
        }

    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
            <h2 className="text-2xl font-bold text-center mb-6 text-sourelle_main_color">Produtos</h2>

            {/* ITEMS LIST */}
            <div className="flex flex-col gap-6">
                {productsCart.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border rounded-md shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={product.url}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                                <h3 className="font-semibold text-base truncate max-w-[150px]">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm">Qtd: {product.amount}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-base">
                                <span className="text-sm">R$</span> {product.price.toFixed(2)}
                            </p>
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
                                    total + product.price * product.amount,
                                0
                            )
                            .toFixed(2)}
                    </span>
                </div>
                {cupomPercentage > 0 && (
                    <>
                        <div className="flex items-center justify-between text-lg font-semibold">
                            <span className="text-gray-500 text-sm">Desconto</span>
                            <span className="text-gray-500 text-sm">- R$ {(productsCart
                                .reduce(
                                    (total, product) =>
                                        total + product.price * product.amount,
                                    0
                                ) * cupomPercentage / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>
                                R$ {(productsCart
                                    .reduce(
                                        (total, product) =>
                                            total + product.price * product.amount,
                                        0
                                    ) * (1 - cupomPercentage / 100)).toFixed(2)}
                            </span>
                        </div>
                    </>
                )}
                <p></p>
                <button
                    className="w-full mt-6 py-3 bg-black text-white rounded-md text-lg hover:bg-gray-800 transition"
                // onClick={handeCheckout}
                >
                    Fechar Pedido
                </button>
            </div>
        </div>
    );
}