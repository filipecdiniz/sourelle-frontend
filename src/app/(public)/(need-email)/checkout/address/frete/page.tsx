"use client";

import { useState } from "react";
import { stateRepository } from "@/repository/stateRepository";
import { CityEntity, getCitiesByState } from "@/repository/cityRepository";
import { ConsumeClientOrderAPI, ConsumeDeliveryAPI } from "@/backEndRoutes";
import Notification from "@/Components/Notification";
import Cookies from "js-cookie";
// import useMercadoPago from "@/app/hooks/useMercadoPago";
import { useRouter } from "next/navigation";

export default function AddressPage() {
    // const router = useRouter();
    // const { createMercadoPagoCheckout } = useMercadoPago();
    const [addressInfoOpen, setAddressInfoOpen] = useState(false);
    const [shipmentValue, setShipmentValue] = useState(0);
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

        if (name === "cep") {
            const onlyDigits = value.replace(/\D/g, '').substring(0, 8);
            setAddressData((prev) => ({ ...prev, [name]: onlyDigits }));
        } else if (name === "numero") {
            const onlyDigits = value.replace(/\D/g, '').substring(0, 4);
            setAddressData((prev) => ({ ...prev, [name]: onlyDigits }));
        }
        else {
            setAddressData((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function FetchShippingPrice() {
        const cupomCookies = Cookies.get("cupom");
        if (cupomCookies) {
            const cupom = JSON.parse(cupomCookies);
            if (cupom.shippingDiscount === true) {
                setShipmentValue(0);
                setAddressInfoOpen(true);
                return;
            }
        }
        const response = await fetch(`${ConsumeDeliveryAPI}/calculate-frete/${addressData.cep}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const responseJson = await response.json();
        setShipmentValue(responseJson);
        setAddressInfoOpen(true);
        return;
    }

    function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedState = e.target.value;
        const state = stateRepository.find((state) => state.name === selectedState);
        setAddressData(prev => ({ ...prev, estado: selectedState, cidade: "" }));

        const filteredCities = getCitiesByState(Number(state?.id));
        setCitiesList(filteredCities);
    }

    async function handlePaymentRedirect() {
        if (!addressData.cep || !addressData.rua || !addressData.bairro || !addressData.cidade || !addressData.estado || !addressData.numero || !addressData.complemento) {
            setShowNotification({
                color: "bg-red-500",
                message: "Preencha todos os campos para continuar.",
                show: true,
            });
            return;
        }

        Cookies.set('addressData', JSON.stringify(addressData));
        await createOrder();
    }

    async function createOrder() {
        const cart = JSON.parse(Cookies.get("cart") || "[]");
        const user = JSON.parse(Cookies.get("user") || "{}");
        const cupomCookies = JSON.parse(Cookies.get("cupom") || "{}");
        try {
            const response = await fetch(`${ConsumeClientOrderAPI}/create-order`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    createClientDTO: user,
                    createAddressDTO: {
                        cep: addressData.cep,
                        street: addressData.rua,
                        district: addressData.bairro,
                        city: addressData.cidade,
                        state: addressData.estado,
                        number: addressData.numero,
                        complement: addressData.complemento,
                        delivered: false
                    },
                    createOrderProductDTO: cart,
                    cupom: cupomCookies,
                    shipmentPrice: shipmentValue
                }),
            });
            if (response.status === 201) {
                const data = await response.json();
                // console.log(data);
                setShowNotification({
                    color: "bg-green-500",
                    message: "Pedido criado com sucesso.",
                    show: true,
                });
                window.location.href = data.initPoint;
                // router.push(data.init_point);
                return;
            }

        } catch (error) {
            console.log(error)
            return;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
                <h1 className="text-center text-2xl font-bold text-sourelle_main_color mb-4">
                    CALCULADORA DE FRETE
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    { }
                    Confirme seu CEP para calcular corretamento o valor do frete.
                </p>
                <div className="cupom relative mt-4">
                    <input
                        type="text"
                        placeholder="CEP"
                        name="cep"
                        className="w-full p-3 pr-20 border rounded-md"
                        value={addressData.cep}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="absolute top-0 right-0 h-full px-4 bg-sourelle_main_color text-white rounded-r-md text-lg hover:bg-gray-800 transition"
                        onClick={FetchShippingPrice}
                    >
                        OK
                    </button>
                </div>
                {addressInfoOpen ? (
                    <>
                        <div className="infoShipment mt-2">
                            <span className="text-sourelle_main_color">Valor do frete: R$ {shipmentValue.toFixed(2)}</span>
                        </div>
                        <div className="infoAddress mt-2">
                            <select
                                name="estado"
                                value={addressData.estado}
                                onChange={handleStateChange}
                                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 appearance-none bg-white"
                            >
                                <option value="" disabled className="text-gray-400">
                                    Selecione o estado
                                </option>
                                {stateRepository.map((state) => (
                                    <option key={state.id} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="cidade"
                                value={addressData.cidade}
                                onChange={handleInputChange}
                                disabled={!addressData.estado}
                                className={`w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 appearance-none ${addressData.estado ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-100 text-gray-400"
                                    }`}
                            >
                                <option value="" disabled>
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
                                placeholder="Complemento e referência"
                                value={addressData.complemento}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                            />
                        </div>
                        <button
                            onClick={handlePaymentRedirect}
                            className="w-full bg-sourelle_main_color mt-4 hover:bg-sourelle_main_color text-white py-3 rounded-md text-sm font-medium transition duration-200"
                        >
                            IR PARA PAGAMENTO
                        </button>
                    </>
                ) : (
                    <div className=""></div>
                )}

            </div>
            <Notification
                color={showNotification.color}
                message={showNotification.message}
                show={showNotification.show}
                onClose={() => setShowNotification((prev) => ({ ...prev, show: false }))}
            />
        </div>
    );
}