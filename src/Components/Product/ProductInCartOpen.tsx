import { ConsumeImageAPI } from "@/backEndRoutes";
import Image from "next/image";

interface ProductProps {
    name: string;
    value: number;
    amount: number;
    src: string;
    onRemove: () => void;
}

export default function ProductInCartOpen({ name, value, amount, src, onRemove }: ProductProps) {
    function formatCurrency(value: number) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

    return (
        <div className="flex gap-4">
            <Image
                src={`${ConsumeImageAPI}${src}`}
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
                        <div className="p-1 bg-gray-50 rounded-sm">{formatCurrency(value * amount)}</div>
                    </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Quantidade: {amount}</span>
                    <button
                        onClick={onRemove}
                        className="text-red-500 hover:underline"
                    >
                        Remover
                    </button>
                </div>
            </div>
        </div>
    );
}
