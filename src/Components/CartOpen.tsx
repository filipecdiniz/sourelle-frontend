"use client"

import Image from "next/image"

export default function CartOpen() {

    const cartItems = true

    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white right-4 flex flex-col gap-6 z-20">
            {!cartItems ? (
                <div className="">Cart is Empty</div>
            ) : (
                <>
                    <h2 className="text-xl">Carrinho</h2>
                    {/* LIST */}
                    <div className="flex flex-col gap-8">
                        {/* ITEM */}
                        <div className="flex gap-4">
                            <Image
                                src=''
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
                                        <h3 className="font-semibold">Product Name</h3>
                                        <div className="p-1 bg-gray-50 rounded-sm">$59</div>
                                    </div>
                                    {/* DESC*/}
                                    <div className="text-sm text-gray-500 ">
                                        avaiable
                                    </div>
                                </div>
                                {/* BOTTOM */}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Quantidade: 2</span>
                                    <span className="text-blue-500">Remover</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* BOTTOM */}

                    <div className="">
                        <div className="flex items-center justify-between font-semibold">
                            <span className="">Subtotal</span>
                            <span className="">$58</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">Taxas de entrega calculadas no final.</p>

                        <div className="flex justify-between text-sm">
                            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">Ver Carrinho</button>
                            <button className="rounded-md py-3 px-4 bg-black text-white">Fechar Pedido</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}