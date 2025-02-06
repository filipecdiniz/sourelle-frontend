"use client"

import Image from "next/image"
import AddCartButton from "./AddCartButton"
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"

//Products while we're testing.
import { mostSoldProducts } from "@/repository/mostSoldProducts"

export default function ListProducts() {

    const [currentIndex, setCurrentIndex] = useState(2);
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

    // const loadMore = () => {
    //     setCurrentIndex((currentIndex) => currentIndex + 2);
    // };

    return (
        // ITEM CONTAINER
        <div className="relative flex justify-center items-center w-full mt-2  ">

            {/* LEFT BUTTON */}
            <button
                onClick={prevSlide}
                className="absolute left-0 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 mb-5"
            >
                <ChevronLeft size={24} />
            </button>

            {/* PRODUCTS */}
            <div className="grid grid-cols-2 p-4 gap-3  md:align-middle md:justify-center">
                {/* ITEM */}
                {mostSoldProducts.slice(0, currentIndex).map((product) => (
                    <div className="flex flex-col justify-center items-center" key={product.id} >
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

            {/* Botão direito */}
            {/* <button
                onClick={loadMore}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2"
            >
                <ChevronRight size={24} />
            </button> */}

            {/* RIGHT BUTTON */}
            <button
                onClick={nextSlide}
                className="absolute right-0 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 mb-5"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    )
}