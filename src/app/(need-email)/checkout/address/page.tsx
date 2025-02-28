"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddressEntity {
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: number,
    complemento: string
}

export default function AddressPage() {
    const [cep, setCep] = useState("");
    const [addressInfoVisible, setAddressInfoVisible] = useState(true);
    const [addressData, setAddressData] = useState<AddressEntity>({
        rua: "",
        bairro: "",
        cidade: "",
        complemento: "",
        estado: "",
        numero: 0
    });
    const router = useRouter();

    // const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    //     setCep(value);

    //     // Exibe os campos adicionais quando o CEP tiver exatamente 8 dígitos
    //     if (value.length === 8) {
    //         console.log("CEP preenchido:", value);

    //         setAddressInfoVisible(true);
    //     } else {
    //         setAddressInfoVisible(false); // Esconde os campos se o CEP não estiver completo
    //     }
    // };

    async function getAddressInfosByCEP(cep: number) {
        try {
            await fetch('')
        } catch (error) {
            
        }
    } 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaymentRedirect = () => {
        console.log("Endereço completo:", { cep, ...addressData });
        router.push("/checkout/payment");
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
                <h1 className="text-center text-2xl font-bold text-blue-600 mb-4">
                    FINALIZAR COMPRA
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Confirme seu endereço para que não tenha erro e consiga receber seu pedido em dia.
                </p>
                <input
                    type="text"
                    name="cep"
                    placeholder="Digite seu CEP"
                    value={cep}
                    maxLength={8}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />

                {addressInfoVisible && (
                    <div className="transition-opacity duration-300 ease-in">
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-gray-700 mb-2">Endereço de entrega:</h2>
                            <p className="text-sm text-gray-600">Rua Exemplo 123, Bairro, Cidade - Estado</p>
                        </div>
                        <input
                            type="text"
                            name="number"
                            placeholder="Número"
                            value={addressData.numero}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <input
                            type="text"
                            name="complement"
                            placeholder="Complemento e referência (opcional)"
                            value={addressData.complemento}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                        />
                        <button
                            onClick={handlePaymentRedirect}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-sm font-medium transition duration-200"
                        >
                            IR PARA O PAGAMENTO
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
