import Image from "next/image";
import AddCartButton from "../AddCartButton";
import Link from "next/link";

interface ProductInterface {
    id: number;
    name: string;
    category: number;
    value: number;
    src: string;
}

export default function ShowProduct({ id, name, /*category,*/ value, src }: ProductInterface) {
    console.log(id)
    return (
        // <div className="" key={id}>{id}</div>
        <div
            className="flex flex-col justify-center items-center w-[170px] h-[220px] flex-shrink-0"
            key={id}
        >

            <div className="relative w-[170px] h-[170px]">
                <Link
                    href={`/produto/${id}`}
                >
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
                <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[170px]">{name}</div>
                <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[170px]">R${value.toString().replace('.', ',')}</div>
                <AddCartButton />
            </div>

        </div>
    )
}