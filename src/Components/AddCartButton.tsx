import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Cookies from "js-cookie";
import Notification from "./Notification";
import { getBackOneProduct } from "@/utils/getBackOneProduct";
import { ProductInterface } from "@/interfaces/Product.interface";

interface AddProductToCart {
    productId: number;
    amount: number;
}

export default function AddCartButton({ productId, amount }: AddProductToCart) {
    const [product, setProduct] = useState<ProductInterface>();
    const { setItemsInCart } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState({
        color: '',
        message: '',
        show: false,
    });
    const [notFound, setNotFound] = useState(false);

    // const product = productsRepository.find((product) => product.id === productId);


    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getBackOneProduct(productId);
            if (!product) {
                setNotFound(true);
            }
            setProduct(product);
        };
        fetchProduct();
    }, []);

    async function addItemCart(productId: number, amount: number) {
        setIsLoading(true);
        const currentCart = Cookies.get("cart");

        if (!currentCart) {
            Cookies.set("cart", JSON.stringify([{ productId, amount }]));
            setItemsInCart(1);
            setShowNotification({
                color: "bg-green-500",
                message: "Produto adicionado ao carrinho.",
                show: true,
            });
        } else {
            const cart = JSON.parse(currentCart);
            const cartProduct = cart.find((prod: AddProductToCart) => prod.productId === productId);
            if (cartProduct) {
                cartProduct.amount += amount;
                setItemsInCart(cart.length);
                Cookies.set("cart", JSON.stringify(cart));
                setShowNotification({
                    color: "bg-green-500",
                    message: "Produto adicionado ao carrinho.",
                    show: true,
                });
            } else {
                cart.push({ productId, amount });
                setItemsInCart(cart.length);
                Cookies.set("cart", JSON.stringify(cart));
                setShowNotification({
                    color: "bg-green-500",
                    message: "Produto adicionado ao carrinho.",
                    show: true,
                });
            }
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    if (notFound || !product) {
        return <div className="text-xs">Produto não encontrado.</div>;
    }

    return (
        <>
            {product.quantity < 1 ? (
                <div className="text-xs">Esgotado no momento.</div>
            ) : (
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
            )}
        </>
    );
}