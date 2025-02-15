import Image from "next/image";

//Repostory while we're testing.
import { categoriesRepository } from "@/repository/categories";
import Link from "next/link";

export default function HomeCategories() {

    return (
        <div className="mt-4 justify-center items-center text-center">
            {/* TEXT */}
            <div className="font-serif text-2xl font-semibold text-gray-900">Categorias</div>
            {/* IMAGES */}
            <div className="grid p-4 grid-cols-2 gap-4 md:grid-cols-3 md:align-middle md:justify-center ">
                {categoriesRepository.map((category) => (
                    <div key={category.id} className="relative w-full aspect-square">
                        <Link
                            href={`categoria/${category.name}`}
                        >
                            <Image
                                src={category.src}
                                alt={category.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer
                                hover:bg-black/30"
                            >
                                <span className="text-white font-bold text-lg">{category.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}