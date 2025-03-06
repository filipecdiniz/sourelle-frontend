import Image from "next/image";
import AddCartButton from "../AddCartButton";
import Link from "next/link";
import { ProductInterface } from "@/interfaces/Product.interface";
import AddSoonButton from "../AddSoonButton";

export default function ShowProduct({ id, name, value, src, quantity }: ProductInterface) {

    return (
        // <div className="" key={id}>{id}</div>
        <div
                        className="flex flex-col items-center w-[150px] h-[220px] flex-shrink-0"
                        key={id}
                    >
                        {quantity < 1 ? (
                            <>
                                <div className="relative w-[150px] h-[124px]">
                                    <Image
                                        src={src}
                                        alt={name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer
                                hover:bg-black/30"
                                    ><p className="text-white">Esgotado</p></div>
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">{name}</div>
                                    <div className="justify-center text-start overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">R${value.toFixed(2).replace('.', ',')}</div>
                                    <AddSoonButton/>
                                    {/* <div className="justify-center text-start overflow-hidden text-ellipsis w-[150px] ">Esgotado no momento.</div> */}
                                </div>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
    )
}