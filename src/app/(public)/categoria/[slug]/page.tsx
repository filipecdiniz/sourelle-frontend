"use client"

import ShowProduct from "@/Components/Product/ShowProduct"
import { CategoryInterface } from "@/interfaces/Category.interface"
import { ProductInterface } from "@/interfaces/Product.interface"
import { getBackProducts } from "@/utils/getBackProducts"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CategoryPage() {
    const router = useParams()
    const [category] = useState<CategoryInterface>()
    const [products, setProducts] = useState<ProductInterface[]>([])
    const categoryId = decodeURIComponent(String(router.slug))


    useEffect(() => {
        const fetchProducts = async () => {
            const products = await awaitGetProducts(Number(categoryId));
            console.log(categoryId);
            // console.log(products);
            setProducts(products);
        };
        fetchProducts();
    }, [categoryId])

    async function awaitGetProducts(categoryId: number) {
        if (categoryId) {
            const products = await getBackProducts(categoryId)
            console.log(products)
            return products
        }
        return;
    }

    // async function awaitGetCategory(categoryId: number) {
    //     if (categoryId) {
    //         const products = await getCategoriesInfos(categoryId)
    //         console.log(products)
    //         return products
    //     }
    //     return;
    // }

    return (
        <div className="flex flex-col p-4 gap-4">
            {products.length > 0 && (
                <h1 className="font-serif text-2xl font-semibold text-gray-900">
                    {category?.name}
                </h1>
            )}

            {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-6">
                    {products.map((item: ProductInterface) => (
                        <ShowProduct
                            id={item.id}
                            name={item.name}
                            url={item.url}
                            price={item.price}
                            key={item.id}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-10">
                    <p className="text-lg text-gray-700 font-medium">
                        Não temos{" "}
                        <span className="text-gray-900 font-semibold">
                            {category?.name}
                        </span>{" "}
                        disponíveis no momento! 🛍️
                    </p>
                    <p className="text-gray-500 mt-2">
                        Que tal conferir outras categorias incríveis?
                    </p>
                </div>
            )}
        </div>
    )
}
