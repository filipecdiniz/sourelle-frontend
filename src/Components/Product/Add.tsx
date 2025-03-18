"use client";

import { useState } from "react";
import AddCartButton from "../AddCartButton";

interface addProductProps {
    productId: number;
    stockNumber: number
}

export default function Add({ stockNumber, productId }: addProductProps) {

    const [quantity, setQuantity] = useState(1);

    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }

        if (type === "i" && quantity < stockNumber) {
            setQuantity((prev) => prev + 1);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-serif text-2xl">Quantidade:</h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                        <button
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("d")}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        {quantity}
                        <button
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("i")}
                            disabled={quantity === stockNumber}
                        >
                            +
                        </button>
                    </div>
                    {/* {stockNumber < 1 ? (
                        <div className="text-xs">Produto sem estoque</div>
                    ) : (
                        <div className="text-xs"> Restam apenas <span className="text-orange-500">{stockNumber} itens</span>{" "} em estoque
                            <br /> {"Não "} perca!
                        </div>
                    )} */}
                </div>
                <AddCartButton
                    productId={productId}
                    amount={quantity}
                />
            </div>
        </div>
    );
};