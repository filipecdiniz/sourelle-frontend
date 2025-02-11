"use client"

import Image from "next/image";
import { useState } from "react";
import FooterContactDiv from "./FooterContactDiv";

export default function Footer() {

    const [contactOpen, setContactOpen] = useState(false)
    const [guaranteeOpen, setGuaranteeOpen] = useState(false)
    const [paymentOpen, setPaymentOpen] = useState(false)

    return (
        <div className="h-[100px] border-t-2">
            {/* CONTACT */}
            {!contactOpen ? (
                <div className="contact flex justify-between p-2 border-b-2">
                    Entre em contato
                    <Image
                        src={`/plus2_icon.png`}
                        alt=""
                        width={20}
                        height={15}
                        onClick={() => setContactOpen((prev) => !prev)}
                    ></Image>
                </div>
            ) : (
                <div className="up border-b-2 p-2">
                    <div className="contact flex justify-between ">
                        Entre em contato
                        <Image
                            src={`/less2_icon.png`}
                            alt=""
                            width={18}
                            height={10}
                            onClick={() => setContactOpen((prev) => !prev)}
                        ></Image>
                    </div>
                    <FooterContactDiv></FooterContactDiv>
                </div>
            )}

            {/* Guarantee */}
            {!guaranteeOpen ? (
                <div className="contact flex justify-between p-2 border-b-2">
                    Garantia
                    <Image
                        src={`/plus2_icon.png`}
                        alt=""
                        width={20}
                        height={15}
                        onClick={() => setGuaranteeOpen((prev) => !prev)}
                    ></Image>
                </div>
            ) : (
                <div className="up border-b-2 p-2">
                    <div className="contact flex justify-between ">
                        Garantia
                        <Image
                            src={`/less2_icon.png`}
                            alt=""
                            width={18}
                            height={10}
                            onClick={() => setGuaranteeOpen((prev) => !prev)}
                        ></Image>
                    </div>
                    <div className="">Nossos produtos possuem garantia de até 3 meses!</div>
                </div>
            )}

            {/* PAYMENT */}
            {!paymentOpen ? (
                <div className="contact flex justify-between p-2 border-b-2">
                    Pagamento
                    <Image
                        src={`/plus2_icon.png`}
                        alt=""
                        width={20}
                        height={15}
                        onClick={() => setPaymentOpen((prev) => !prev)}
                    ></Image>
                </div>
            ) : (
                <div className="up border-b-2 p-2">
                    <div className="contact flex justify-between ">
                        Pagamento
                        <Image
                            src={`/less2_icon.png`}
                            alt=""
                            width={18}
                            height={10}
                            onClick={() => setPaymentOpen((prev) => !prev)}
                        ></Image>
                    </div>
                    <div className="flex p-2 gap-4">
                        <div className="">Pagamentos rápidos e seguros</div>
                        <div className="flex flex-row gap-2">
                            <Image
                                src={`/mastercard.png`}
                                alt=""
                                width={30}
                                height={20}
                            />
                            <Image
                                src={`/visa.png`}
                                alt=""
                                width={30}
                                height={20}
                            />
                            <Image
                                src={`/elo.png`}
                                alt=""
                                width={40}
                                height={20}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col justify-center text-center">
                <div className="text-sm text-gray-600">Copyright SOURELLE LTDA - 2025. Todos os direitos reservados.</div>
                <div className="text-sm text-gray-600">Criado por DevShopBrasil</div>
            </div>
        </div>
    );
}
