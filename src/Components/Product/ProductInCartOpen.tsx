import Image from "next/image";

interface productProps {
    name: string;
    value: number;
    amount: number;
    src: string
}

export default function ProductInCartOpen({ name, value, amount, src }: productProps) {
    // console.log(value)
    const formatCurrency = (name: string, value: number) => {
        console.log(`${name}, ${value}`)
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div className="flex gap-4">
            <Image
                src={`${src}`}
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
            />
            <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                        <h3 className="font-semibold">{name}</h3>
                        <div className="p-1 bg-gray-50 rounded-sm">{formatCurrency(name, value * amount)}</div>
                    </div>
                    {/* DESC*/}
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Quantidade: {amount}</span>
                    <span className="text-blue-500">Remover</span>
                </div>
            </div>
        </div>
    )
}