import { ConsumeCartAPI } from "@/backEndRoutes";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import Notification from "./Notification";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

interface AddProductToCart {
    productId: number;
    amount: number;
}

export default function AddCartButton({ productId, amount }: AddProductToCart) {

    const { setItemsInCart } = useAppContext()
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState({
        color: '',
        message: '',
        show: false
    });
    const router = useRouter()
    const authToken = Cookies.get('authToken')

    async function addItemCart(productId: number, amount: number) {

        if (!authToken) {
            setShowNotification({
                color: "bg-blue-500",
                message: "Faça login para adicionar o produto ao carrinho.",
                show: true
            })
            setTimeout(() => {
                router.push('/login')
            }, 2000);
        }

        setIsLoading(true);

        if (authToken) {
            try {
                const response = await fetch(`${ConsumeCartAPI}`, {
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
                setItemsInCart(cart.cartProduct.length)
                Cookies.set("cart", JSON.stringify(cart.cartProduct));

                setShowNotification({
                    color: "bg-green-500",
                    message: "Item adicionado ao carrinho.",
                    show: true
                });
            } catch (error) {
                setShowNotification({
                    color: "bg-blue-500",
                    message: `${error}`,
                    show: true
                });
            } finally {
                setIsLoading(false);
            }
        }
        // const currentCart = Cookies.get('cart_products_no_user')
        // if (!currentCart) {
        //     const cartProducts = { cart: 'user_offline', cartProducts: [{ productId, amount }] }
        //     Cookies.set("cart_products_no_user", JSON.stringify(cartProducts));
        //     setShowNotification({
        //         color: "bg-blue-500",
        //         message: "Faça login para adicionar o produto ao carrinho.",
        //         show: true
        //     });
        //     setIsLoading(false)
        //     return
        // } if (currentCart) {
        //     const cartProducts = JSON.parse(currentCart);

        //     const productExists = cartProducts.cartProducts.find(
        //         (product: any) => product.productId === productId
        //     );

        //     if (productExists) {
        //         productExists.amount += 1;
        //         console.log(cartProducts)
        //         Cookies.set('cart_products_no_user', JSON.stringify(cartProducts));
        //         setShowNotification({
        //             color: "bg-blue-500",
        //             message: "Faça login para adicionar o produto ao carrinho.",
        //             show: true
        //         });;
        //         setIsLoading(false);
        //         return;
        //     } else {
        //         cartProducts.cartProducts.push({ productId, amount: 1 });
        //         Cookies.set('cart_products_no_user', JSON.stringify(cartProducts));
        //         setShowNotification({
        //             color: "bg-blue-500",
        //             message: "Faça login para adicionar o produto ao carrinho.",
        //             show: true
        //         });
        //         setIsLoading(false);
        //         return;
        //     }
        // }
        setIsLoading(false);
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
                color={showNotification.color}
                message={showNotification.message}
                show={showNotification.show}
                onClose={() => setShowNotification((prev) => ({ ...prev, show: false }))}
            />
        </>
    );
}
