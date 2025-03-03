"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { stateRepository } from "@/repository/stateRepository";
import { CityEntity, getCitiesByState } from "@/repository/cityRepository";

export default function AddressPage() {
    const router = useRouter();
    const [addressData, setAddressData] = useState({
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        complemento: "",
        estado: "",
        numero: ""
    });
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });

    const [citiesList, setCitiesList] = useState<CityEntity[]>([]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        if (name === "cep" || name === "number") {
            const onlyDigits = value.replace(/\D/g, '').substring(0, 11);
            setAddressData((prev) => ({ ...prev, [name]: onlyDigits }));
        } else {
            setAddressData((prev) => ({ ...prev, [name]: value }));
        }
    }

    function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedState = e.target.value;
        const state = stateRepository.find((state) => state.name === selectedState);
        setAddressData(prev => ({ ...prev, estado: selectedState, cidade: "" }));

        const filteredCities = getCitiesByState(Number(state?.id));
        console.log(filteredCities);
        setCitiesList(filteredCities);
    }

    function handlePaymentRedirect() {
        console.log(addressData);
        // router.push("/checkout/payment");
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
                <h1 className="text-center text-2xl font-bold text-sourelle_main_color mb-4">
                    FINALIZAR COMPRA
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Confirme seu endereço para que não tenha erro e consiga receber seu pedido em dia.
                </p>
                <input
                    type="text"
                    name="cep"
                    placeholder="CEP (apenas números)"
                    onChange={handleInputChange}
                    value={addressData.cep}
                    maxLength={8}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="rua"
                    placeholder="Rua"
                    onChange={handleInputChange}
                    value={addressData.rua}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="bairro"
                    placeholder="Bairro"
                    onChange={handleInputChange}
                    value={addressData.bairro}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                {/* Select para estados */}
                <select
                    name="estado"
                    value={addressData.estado}
                    onChange={handleStateChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                >
                    <option value="">Selecione o estado</option>
                    {stateRepository.map((state) => (
                        <option key={state.id} value={state.name}>
                            {state.name}
                        </option>
                    ))}
                </select>
                {/* Select para cidades, habilitado somente se um estado já tiver sido selecionado */}
                <select
                    name="cidade"
                    value={addressData.cidade}
                    onChange={handleInputChange}
                    disabled={!addressData.estado}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                >
                    <option value="">
                        {addressData.estado
                            ? "Selecione a cidade"
                            : "Selecione um estado primeiro"}
                    </option>
                    {citiesList.map((cidade) => (
                        <option key={cidade.id} value={cidade.name}>
                            {cidade.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="numero"
                    placeholder="Número"
                    value={addressData.numero}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="complemento"
                    placeholder="Complemento e referência (opcional)"
                    value={addressData.complemento}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                />
                <button
                    onClick={handlePaymentRedirect}
                    className="w-full bg-sourelle_main_color hover:bg-sourelle_main_color text-white py-3 rounded-md text-sm font-medium transition duration-200"
                >
                    IR PARA O PAGAMENTO
                </button>
            </div>
        </div>
    );
}