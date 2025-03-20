import { useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import OrderInterface from "@/interfaces/Order/Order.interface";
import { AddressEntity } from "@/interfaces/AddressEntity";
import { ConsumeClientOrderAPI } from "@/backEndRoutes";
import ClientInterface from "@/interfaces/Order/Client.interface";
// import clearCookies from "@/utils/clearCookies";

const useMercadoPago = () => {
    const router = useRouter();

    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
    }, []);

    async function createMercadoPagoCheckout(
        addressData: AddressEntity,
        user: ClientInterface,
        cart: OrderInterface[],
        cupomCookies: string,
        shipmentValue: number
    ) {
        try {
            console.log(cupomCookies);
            const response = await fetch(`${ConsumeClientOrderAPI}/create-order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
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
                        delivered: false,
                    },
                    createOrderProductDTO: cart,
                    cupom: cupomCookies,
                    shipmentPrice: shipmentValue,
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                // clearCookies();
                router.push(data.initPoint);
            } else {
                console.error("Erro ao criar o pedido", response);
            }
        } catch (error) {
            console.error("Erro no checkout do Mercado Pago:", error);
        }
    }

    return { createMercadoPagoCheckout };
};

export default useMercadoPago;