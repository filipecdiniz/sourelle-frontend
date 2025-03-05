import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { productsRepository } from "@/repository/products";
import Cookies from "js-cookie";
import Notification from "./Notification";


export default function AddSoonButton() {
    const [showNotification, setShowNotification] = useState({
        color: '',
        message: '',
        show: false
    });
    return (
        <>
            <>
                <button
                    // onClick={() => addItemCart(productId, amount)}
                    className="w-36 text-sm rounded-3xl ring-1 py-2 px-4 transition-all ring-light_red text-light_red hover:bg-light_red hover:text-white"
                >Em Breve

                </button>
                {/* <Notification
                        color={showNotification.color}
                        message={showNotification.message}
                        show={showNotification.show}
                        onClose={() => setShowNotification((prev) => ({ ...prev, show: false }))}
                    /> */}
            </>
        </>
    );
}