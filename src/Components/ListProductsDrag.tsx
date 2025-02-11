"use client";

import Image from "next/image";
import AddCartButton from "./AddCartButton";
import { useRef } from "react";
import { mostSoldProducts } from "@/repository/mostSoldProducts";

interface Product {
    id: number;
    src: string;
    name: string;
    value: number;
}

export default function ListProducts() {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const startX = useRef(0);
    const isDragging = useRef(false);

    // Define os produtos a serem exibidos (não há mais limite de itens por página)
    const visibleProducts = mostSoldProducts;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (carouselRef.current) {
            isDragging.current = true;
            startX.current = e.clientX;
            carouselRef.current.style.cursor = 'grabbing'; // Mostrar que está arrastando
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !carouselRef.current) return;

        const moveX = e.clientX - startX.current;
        carouselRef.current.scrollLeft -= moveX; // Ajuste a rolagem à medida que o usuário arrasta
        startX.current = e.clientX; // Atualize a posição de arraste
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grab'; // Retorna o cursor ao estado normal
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (carouselRef.current) {
            isDragging.current = true;
            startX.current = e.touches[0].clientX;
            carouselRef.current.style.cursor = 'grabbing';
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current || !carouselRef.current) return;

        const moveX = e.touches[0].clientX - startX.current;
        carouselRef.current.scrollLeft -= moveX;
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grab';
        }
    };

    return (
        <div className="relative flex justify-center items-center w-full mt-2 min-h-[230px]">
            {/* Produtos */}
            <div
                ref={carouselRef}
                className="relative flex justify-start gap-3 p-4 overflow-x-auto cursor-grab transition-all duration-500 ease-in-out min-h-[200px]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {visibleProducts.map((product: Product) => (
                    <div
                        className="flex flex-col justify-center items-center w-[150px] h-[220px] flex-shrink-0"
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
                            <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">{product.name}</div>
                            <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">R${product.value}</div>
                            <AddCartButton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
