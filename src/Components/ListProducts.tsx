"use client";

import Image from "next/image";
import AddCartButton from "./AddCartButton";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mostSoldProducts } from "@/repository/mostSoldProducts";

export default function ListProducts() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 2;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsPerPage < mostSoldProducts.length ? prevIndex + itemsPerPage : 0
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - itemsPerPage >= 0 ? prevIndex - itemsPerPage : mostSoldProducts.length - itemsPerPage
        );
    };

    // Define os produtos a serem exibidos
    const visibleProducts = mostSoldProducts.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <div className="relative flex justify-center items-center w-full mt-2 min-h-[230px]">
            {/* Botão Esquerdo */}
            <button
                onClick={prevSlide}
                className="absolute left-0 bg-white shadow-lg rounded-full p-2 z-10"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Produtos */}
            <div className="relative w-full flex justify-center">
                <div
                    className={`grid ${
                        visibleProducts.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    } p-4 gap-3 transition-opacity duration-500 ease-in-out min-h-[200px]`}
                >
                    {visibleProducts.map((product) => (
                        <div
                            className="flex flex-col justify-center items-center w-[150px] h-[220px]"
                            key={product.id}
                        >
                            <div className="relative w-[150px] h-[150px]">
                                <Image
                                    src={product.src}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <div className="justify-center text-start">{product.name}</div>
                                <div className="justify-center text-start">R${product.value}</div>
                                <AddCartButton />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Botão Direito */}
            <button
                onClick={nextSlide}
                className="absolute right-0 bg-white shadow-lg rounded-full p-2 z-10"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
