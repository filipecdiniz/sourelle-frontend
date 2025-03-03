"use client"

import Image from "next/image";
import { useState } from "react";
import FooterContactDiv from "./FooterContactDiv";

export default function Footer() {

    const [contactOpen, setContactOpen] = useState(false)
    const [guaranteeOpen, setGuaranteeOpen] = useState(false)
    const [paymentOpen, setPaymentOpen] = useState(false)

    return (
        <div className="mt-auto">
            {/* CONTACT */}
            {!contactOpen ? (
                <div className="contact flex justify-between p-2 border-b-2">
                    Entre em contato
                    <Image
                        src={`/plus_icon.svg`}
                        alt=""
                        width={16}
                        height={16}
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
                            height={8}
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
                        src={`/plus_icon.svg`}
                        alt=""
                        width={16}
                        height={16}
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
                            height={8}
                            onClick={() => setGuaranteeOpen((prev) => !prev)}
                        ></Image>
                    </div>
                    <div className="">Garantia vitalícia: todos os produtos fabricados em prata 925.</div>
                </div>
            )}

            {/* PAYMENT */}
            {!paymentOpen ? (
                <div className="contact flex justify-between p-2 border-b-2">
                    Pagamento
                    <Image
                        src={`/plus_icon.svg`}
                        alt=""
                        width={16}
                        height={16}
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
                            height={8}
                            onClick={() => setPaymentOpen((prev) => !prev)}
                        ></Image>
                    </div>
                    <div className="flex flex-col p-2 gap-4">
                        <div className="">Pagamentos rápidos e seguros!</div>
                        <div className="flex flex-row justify-center gap-2">
                            <Image
                                src={`/mastercard_icon.svg`}
                                alt=""
                                width={28}
                                height={16}
                            />
                            <Image
                                src={`/visa_icon.svg`}
                                alt=""
                                width={28}
                                height={16}
                            />
                            <Image
                                src={`/pix_icon.svg`}
                                alt=""
                                width={30}
                                height={16}
                            />
                            <Image
                                src={`/mercado_pago_icon.svg`}
                                alt=""
                                width={30}
                                height={16}
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
