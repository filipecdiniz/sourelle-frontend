"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProductInCartOpen from "./Product/ProductInCartOpen";
import { useRouter } from "next/navigation";
import Notification from "./Notification";
import { useAppContext } from "@/context/AppContext";
import { ProductInCart } from "@/interfaces/ProductInCart";
import { CartProduct } from "@/interfaces/CartProduct";
import { getBackProducts } from "@/utils/getBackProducts";
import { ProductInterface } from "@/interfaces/Product.interface";

export default function CartOpen() {
    const { syncCart } = useAppContext();
    const [productsCart, setProductsCart] = useState<ProductInCart[]>([]);
    const [productsBack, setProductsBack] = useState<ProductInterface[]>([]);
    const [visibleItems, setVisibleItems] = useState<number>(4);
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });
    const router = useRouter()
    const cartItems = productsCart.length > 0;
    const cartCookies = Cookies.get("cart");
    // const authToken = Cookies.get("authToken");

    useEffect(() => {
        async function loadProducts() {
            await awaitGetProducts();
        }
        loadProducts();
    }, [cartCookies]);

    useEffect(() => {
        if (cartCookies && productsBack.length) {
            updateCartItems();
        }
    }, [cartCookies, productsBack]);

    async function awaitGetProducts() {
        const products: ProductInterface[] = await getBackProducts()
        setProductsBack(products);
    }

    function updateCartItems() {
        if (cartCookies) {
            const cartItems: CartProduct[] = JSON.parse(cartCookies);
            const cartProducts: ProductInCart[] = [];
            cartItems.forEach((item) => {
                const product = productsBack.find((product) => product.id === item.productId);
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
        }
    }

    // function handeCheckout() {
    //     router.push('/checkout/profile')
    // }

    function handeCart() {
        router.push('/checkout/cart')
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

    function handleLoadMore() {
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
                                name={product.name}
                                value={product.price}
                                amount={product.amount}
                                src={product.url}
                                onRemove={() => handleRemoveQuantityCookies(product.id)}
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
                            {/* <span className="">R$ {productsCart.reduce((total, product) => total + product.product.price * product.amount, 0).toFixed(2)}</span> */}
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">Taxas de entrega calculadas no final.</p>

                        <div className="flex justify-end text-sm gap-4">
                            {/* <button className="rounded-md py-3 px-4 ring-1 ring-gray-300" onClick={handeCart}>Ver Carrinho</button> */}
                            <button className="rounded-md py-3 px-4 bg-black text-white" onClick={handeCart}>Fechar Pedido</button>
                        </div>
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
