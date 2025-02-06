import Image from "next/image";

const categories = [
    {
        id: 1,
        name: 'Anéis',
        src: '/categories/category-1-anel.jpg'
    },
    {
        id: 2,
        name: 'Colares',
        src: '/categories/category-2-colar.webp'
    },
    {
        id: 3,
        name: 'Pulseiras',
        src: '/categories/category-3-pulseira.webp'
    },
    {
        id: 4,
        name: 'Braceletes',
        src: '/categories/category-4-braceletes.webp'
    },
    {
        id: 5,
        name: 'Tornozeleiras',
        src: '/categories/category-5-tornozeleira.webp'
    },
    {
        id: 6,
        name: 'Brincos',
        src: '/categories/category-6-brinco.webp'
    }
    // ,
    // {
    //     id: 7,
    //     name: 'Conjuntos',
    //     src: '/categories/category-7-conjuntos.webp'
    // },
];

export default function HomeCategories() {
    return (
        <div className="mt-4 justify-center items-center text-center">
            {/* TEXT */}
            <div className="font-serif text-2xl">Categorias</div>
            {/* IMAGES */}
            <div className="grid grid-cols-2 gap-4 p-4">
                {categories.map((category) => (
                    <div key={category.id} className="relative w-full aspect-square">
                        <Image
                            src={category.src}
                            alt={category.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <span className="text-white font-bold text-lg">{category.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}