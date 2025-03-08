"use client";

import { ConsumeCupomAPI } from "@/backEndRoutes";
import Notification from "@/Components/Notification";
import { useAppContext } from "@/context/AppContext";
import { CartProduct } from "@/interfaces/CartProduct";
import { ProductInCart } from "@/interfaces/ProductInCart";
import { productsRepository } from "@/repository/products";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { syncCart } = useAppContext();
    const router = useRouter();
    const [productsCart, setProductsCart] = useState<ProductInCart[]>([]);
    const [cupom, setCupom] = useState<string>("");
    const [cupomPercentage, setCupomPercentage] = useState(0);
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });
    // const authToken = Cookies.get("authToken");
    const cartCookies = Cookies.get("cart");
    const cupomCookies = Cookies.get('cupom');

    useEffect(() => {
        updateCartItems();
    }, [cartCookies, cupomCookies]);

    function updateCartItems() {
        if (cartCookies) {
            const cartItems: CartProduct[] = JSON.parse(cartCookies);
            const cartProducts: ProductInCart[] = [];
            cartItems.forEach((item) => {
                const product = productsRepository.find((product) => product.id === item.productId);
                if (product) {
                    cartProducts.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        url: product.url,
                        amount: item.amount,
                    });
                }
            });
            setProductsCart(cartProducts);
            if (cupomCookies) {
                const cupom = JSON.parse(cupomCookies);
                setCupom(cupom.cupom);
                setCupomPercentage(parseInt(cupom.percentage));
            }
        }

    }

    async function handleApplyCupom() {
        try {
            const response = await fetch(`${ConsumeCupomAPI}/try`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cupom: cupom,
                }),
            });
            const responseJson = await response.json();
            if (response.ok && responseJson.percentage > 0) {
                // console.log(responseJson.percentage);
                setCupomPercentage(responseJson.percentage);
                Cookies.set('cupom', JSON.stringify({ cupom: cupom, percentage: responseJson.percentage }));
                setShowNotification({
                    color: 'bg-green-500',
                    message: 'Cupom aplicado com sucesso!',
                    show: true,
                });
                return;
            }
            setCupomPercentage(0);
            setCupom("");
            Cookies.set('cupom', JSON.stringify({ cupom: "", percentage: 0 }));
            setShowNotification({
                color: 'bg-red-500',
                message: 'Cupom inválido ou expirado!',
                show: true,
            });
            return;

        } catch (error) {
            console.log(error);
            setShowNotification({
                color: 'bg-red-500',
                message: `${error}`,
                show: true,
            });
            return;
        }

    }

    function handeCheckout() {
        router.push("/checkout/profile");
    }

    async function handleRemoveQuantityCookies(productId: number) {
        const newCart = productsCart.map((product: ProductInCart) => {
            if (product.id === productId) {
                return { productId: product.id, amount: product.amount - 1 };
            }
            return { productId: product.id, amount: product.amount };
        }).filter((product) => product.amount > 0);

        const newProductsCart = productsCart.map((product: ProductInCart) => {
            if (product.id === productId) {
                return { ...product, amount: product.amount - 1 };
            }
            return product;
        }).filter((product) => product.amount > 0);

        setProductsCart(newProductsCart);
        Cookies.set("cart", JSON.stringify(newCart));
        await syncCart();
    }

    // async function handleRemoveQuantity(productId: number, amount: number) {
    //     try {
    //         const response = await fetch(ConsumeCartAPI, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${authToken}`,
    //             },
    //             body: JSON.stringify({
    //                 productId: productId,
    //                 amount: amount - 1,
    //             }),
    //         });
    //         if (response.ok) {
    //             const updatedCart = await response.json();

    //             console.log(updatedCart);
    //             setProductsCart(updatedCart.cartProduct);
    //             await syncCart()
    //             Cookies.set("cart", JSON.stringify(updatedCart.cartProduct));
    //         } else {
    //             console.log('Erro no servidor ao atualizar o carrinho.');
    //             setShowNotification({
    //                 color: 'bg-red-500',
    //                 message: 'Erro no servidor ao atualizar o carrinho.',
    //                 show: true,
    //             });
    //         }
    //     } catch (error) {
    //         setShowNotification({
    //             color: 'bg-red-500',
    //             message: `${error}`,
    //             show: true,
    //         });
    //     }
    // }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
            {!productsCart.length ? (
                <div className="text-center py-10 text-gray-600 text-lg">Carrinho está vazio</div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6 text-sourelle_main_color">Carrinho de Compras</h2>

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
                                    <button
                                        className="text-red-500 text-sm mt-2"
                                        onClick={() => handleRemoveQuantityCookies(product.id)}
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
                        <p className="text-gray-500 text-sm mt-2">
                            Taxas de entrega calculadas no final.
                        </p>
                        <div className="cupom relative mt-4">
                            <input
                                type="text"
                                placeholder="Cupom de desconto"
                                className="w-full p-3 pr-20 border rounded-md"
                                value={cupom}
                                onChange={(e) => setCupom(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 h-full px-4 bg-black text-white rounded-r-md text-lg hover:bg-gray-800 transition"
                                onClick={handleApplyCupom}
                            >
                                Aplicar
                            </button>
                        </div>
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
