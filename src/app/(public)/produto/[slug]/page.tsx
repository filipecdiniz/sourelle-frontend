"use client"

import { ConsumeImageAPI } from "@/backEndRoutes";
import Add from "@/Components/Product/Add";
import { ProductInterface } from "@/interfaces/Product.interface";
import { getBackProducts } from "@/utils/getBackProducts";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
    const params = useParams();
    const productId = Number(params.slug);
    const [productsBack, setProductsBack] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            const products: ProductInterface[] = await getBackProducts();
            if (products) {
                setProductsBack(products);
            }
            setLoading(false);
        }
        loadProducts();
    }, [productId]);

    const product = productsBack.find((item) => item.id === productId);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="grid md:grid-cols-2 gap-8">
                {/* LEFT: Product Image */}
                <div className="flex justify-center items-center">
                    <Image
                        src={`${ConsumeImageAPI}${product.url}`}
                        alt="Product Image"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* RIGHT: Product Details */}
                <div className="flex flex-col justify-start">
                    <div className="text-4xl font-semibold text-[#3F2A47]">{product.name}</div>
                    <p className="mt-4 text-lg text-gray-700">
                        Descrição do produto: {product.description}
                    </p>

                    <div className="mt-2">
                        <Add
                            productId={product.id}
                            stockNumber={4}
                            key={product.id}
                        />
                    </div>

                    {/* Price Section */}
                    <div className="mt-8 text-3xl font-bold text-[#915F78]">
                        R$ {product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}