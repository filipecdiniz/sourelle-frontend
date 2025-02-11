"use client"

import ShowProduct from "@/Components/Product/ShowProduct"
import { categoriesRepository } from "@/repository/categories"
import { produtsRepository } from "@/repository/products"
import { useParams } from "next/navigation"

interface CategoryInterface {
    id: number,
    name: string,
    src: string
}

export default function CategoryPage() {

    const router = useParams()
    const category = String(router.slug)

    // console.log(categoriesRepository.filter(item => item.name === decodeURIComponent(category)))
    const categoryRepository = categoriesRepository.filter((item) => item.name === decodeURIComponent(category))
    console.log(categoryRepository)
    const products = produtsRepository.filter((product) => product.category === categoryRepository[0].id)
    console.log(products)

    return (
        <div className="flex flex-col p-4 gap-2">
            <div className="font-serif text-2xl">Página de Categoria {decodeURIComponent(category)}</div>
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
        </div>
    )
}
