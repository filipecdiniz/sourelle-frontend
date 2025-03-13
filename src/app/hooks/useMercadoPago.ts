import { useEffect, useState } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { ConsumeClientOrderAPI } from "@/backEndRoutes";

const useMercadoPago = () => {
    const router = useRouter();
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });


    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
    }, []);

    async function createMercadoPagoCheckout(checkoutData: any) {
        try {
            const response = await fetch(`${ConsumeClientOrderAPI}/create-order`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    createClientDTO: checkoutData.user,
                    createAddressDTO: {
                        cep: checkoutData.addressData.cep,
                        street: checkoutData.addressData.rua,
                        district: checkoutData.addressData.bairro,
                        city: checkoutData.addressData.cidade,
                        state: checkoutData.addressData.estado,
                        number: checkoutData.addressData.numero,
                        complement: checkoutData.addressData.complemento
                    },
                    createOrderProductDTO: checkoutData.cart,
                    cupom: checkoutData.cupomCookies,
                    shipmentPrice: checkoutData.shipmentValue
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
                // createMercadoPagoCheckout({ data });
                console.log(data.initPoint);
                createMercadoPagoCheckout({ data })
                // window.location.href = data.initPoint;
                // router.push(data.init_point);
                return;
            }

        } catch (error) {
            console.log(error)
            return;
        }
    }

    return { createMercadoPagoCheckout };
};

export default useMercadoPago;