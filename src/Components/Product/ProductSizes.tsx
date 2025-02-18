import { useState } from "react";

export default function ProductSizes() {
    const [selectedSize, setSelectedSize] = useState<number | null>(null); // Estado para o tamanho selecionado
    const sizes: number[] = [10, 12, 14, 16, 18, 20]; // Lista de tamanhos

    return (
        <div className="flex space-x-4 mt-6 mb-2">
            <div className="font-semibold text-xl text-[#915F78]">Tamanho: </div>
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedSize === size
                        ? "bg-[#915F78] border-[#915F78] text-white"
                        : "bg-gray-200 border-gray-400 text-gray-800"
                        } flex justify-center items-center shadow-md transition-all duration-200 ease-in-out`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

