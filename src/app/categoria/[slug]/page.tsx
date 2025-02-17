"use client"

import ShowProduct from "@/Components/Product/ShowProduct"
import { categoriesRepository } from "@/repository/categories"
import { productsRepository } from "@/repository/products"
import { useParams } from "next/navigation"

export default function CategoryPage() {
    const router = useParams()
    const category = decodeURIComponent(String(router.slug))

    const categoryRepository = categoriesRepository.filter((item) => item.name === category)
    const products = productsRepository.filter((product) => product.category === categoryRepository[0]?.id)

    return (
        <div className="flex flex-col p-4 gap-4">
            {products.length > 0 && (
                <h1 className="font-serif text-2xl font-semibold text-gray-900">
                    {category}
                </h1>
            )}

            {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((item) => (
                        <ShowProduct
                            id={item.id}
                            category={item.category}
                            name={item.name}
                            src={item.src}
                            value={item.value}
                            key={item.id}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-10">
                    <p className="text-lg text-gray-700 font-medium">
                        Não temos{" "}
                        <span className="text-gray-900 font-semibold">
                            {category}
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
