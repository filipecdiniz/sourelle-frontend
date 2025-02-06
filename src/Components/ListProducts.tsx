const produts = [
    {
        id: 1,
        name: 'Aliança prata',
        category: 1,
        src: '/categories/category-1-anel.jpg'
    },
    {
        id: 2,
        name: 'Brinco prata',
        category: 6,
        src: '/categories/category-6-brinco.webp'
    }
]

export default function ListProducts() {
    return (
        <div className="">
            {produts.map((product) => (
                <div className="" key={product.id}>{product.name}</div>
            ))}
        </div>
    )
}