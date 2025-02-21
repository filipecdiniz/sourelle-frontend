"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

export default function SearchResults() {
    const { searchResults } = useAppContext();

    if (!searchResults || searchResults.length === 0) {
        console.log(searchResults)
        return null;
    }

    return (
        <div className="absolute  bg-white shadow-md rounded-md p-4 w-full z-50 max-h-[50vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Resultados da Pesquisa:</h3>
            <ul className="flex flex-col gap-4">
                {searchResults.map((product) => (
                    <li
                        key={product.id}
                        className="flex items-center gap-4 border-b last:border-none pb-2"
                    >
                        <Image
                            src={product.url}
                            alt={product.name}
                            className="object-cover w-16 h-16 rounded-md"
                        />
                        <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-500">R${product.price.toFixed(2)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
