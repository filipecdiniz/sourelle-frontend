"use client"

import Add from "@/Components/Product/Add";
import { productsRepository } from "@/repository/products";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductPage() {
    const router = useParams()
    const url = Number(router.slug)
    const product = productsRepository.find((item) => item.id === url)

    return (
        <div className="container mx-auto p-6">
            <div className="grid md:grid-cols-2 gap-8">
                {/* LEFT: Product Image */}
                <div className="flex justify-center items-center">
                    <Image
                        src={`${product?.src}`}
                        alt='Product Image'
                        layout="intrinsic"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* RIGHT: Product Details */}
                <div className="flex flex-col justify-start">
                    <div className="text-4xl font-semibold text-[#3F2A47]">{product?.name}</div>
                    <p className="mt-4 text-lg text-gray-700">
                        Descrição do produto: Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto vero consequuntur.
                    </p>

                    <div className="mt-6">
                        <div className="font-semibold text-xl text-[#915F78]">Tamanho:</div>
                        <Add
                            productId={`${product?.id}`}
                            stockNumber={4}
                            key={1}
                        />
                    </div>

                    {/* Price Section */}
                    <div className="mt-8 text-3xl font-bold text-[#915F78]">
                        R$ {product?.value.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}
