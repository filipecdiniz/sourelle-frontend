"use client";

import Image from "next/image";
import AddCartButton from "./AddCartButton";
import { useEffect, useRef, useState, } from "react";
import Link from "next/link";
import AddSoonButton from "./AddSoonButton";
import { getBackProducts } from "@/utils/getBackProducts";
import { ProductInterface } from "@/interfaces/Product.interface";
import { ConsumeImageAPI } from "@/backEndRoutes";

interface categoryProps {
    categoryId: number
}

export default function ListProducts({ categoryId }: categoryProps) {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [productsBack, setProductsBack] = useState<ProductInterface[]>([])
    const startX = useRef(0);
    const isDragging = useRef(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const products: ProductInterface[] = (await getBackProducts(categoryId)) || [];
            setProductsBack(prevProducts => {
                if (
                    prevProducts.length === products.length &&
                    prevProducts.every((prod, idx) => prod.id === products[idx].id)
                ) {
                    return prevProducts;
                }
                return products;
            });
        };
        fetchProducts();
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (carouselRef.current) {
            isDragging.current = true;
            startX.current = e.clientX;
            carouselRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !carouselRef.current) return;

        const moveX = e.clientX - startX.current;
        carouselRef.current.scrollLeft -= moveX;
        startX.current = e.clientX;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grab';
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
            {/* PRODUCTS */}
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
                {productsBack.map((product: ProductInterface) => (
                    <div
                        className="flex flex-col items-center w-[150px] h-[220px] flex-shrink-0"
                        key={product.id}
                    >
                        {product.quantity < 1 ? (
                            <>
                                <div className="relative w-[150px] h-[124px]">
                                    <Image
                                        src={`${ConsumeImageAPI}${product.url}`}
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer
                                hover:bg-black/30"
                                    ><p className="text-white">Esgotado</p></div>
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">{product.name}</div>
                                    <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">R${product.price.toFixed(2).replace(',', '.')}</div>
                                    <AddSoonButton />
                                    {/* <div className="justify-center text-start overflow-hidden text-ellipsis w-[150px] ">Esgotado no momento.</div> */}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative w-[150px] h-[124px]">
                                    <Link href={`/produto/${product.id}`}>
                                        <Image
                                            src={`${ConsumeImageAPI}${product.url}`}
                                            alt={product.name}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">{product.name}</div>
                                    <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">R${product.price.toFixed(2).replace(',', '.')}</div>
                                    <AddCartButton
                                        amount={1}
                                        productId={product.id}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
