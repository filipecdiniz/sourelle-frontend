import Image from "next/image";
import Link from "next/link";
import AddCartButton from "../AddCartButton";
import { ProductInterface } from "@/interfaces/Product.interface";

export default function SearchProduct({ id, name, src, value }: ProductInterface) {
    return (
        <div className="flex flex-col justify-center items-center w-[150px] h-[200px] flex-shrink-0">
            <div className="relative w-[150px] h-[124px]">
                <Link href={`/produto/${id}`}>
                    <Image
                        src={src}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </Link>
            </div>
            <div className="flex flex-col gap-1 mt-1">
                <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">{name}</div>
                <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">R${value.toFixed(2).replace('.', ',')}</div>
                <AddCartButton
                    amount={1}
                    productId={id}
                />
            </div>
        </div>
    )
}