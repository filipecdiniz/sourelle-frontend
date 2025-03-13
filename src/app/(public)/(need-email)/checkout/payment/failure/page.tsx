"use client";

import { ConsumeClientOrderAPI } from "@/backEndRoutes";
import clearCookies from "@/utils/clearCookies";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
    const searchParams = useSearchParams();
    console.log(searchParams);
    const client_id = searchParams.get("client_id");
    const collection_id = searchParams.get("collection_id");
    const collection_status = searchParams.get('collection_status');
    const payment_id = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const external_reference = searchParams.get('external_reference');
    const payment_type = searchParams.get('payment_type');
    const merchant_order_id = searchParams.get('merchant_order_id');
    const preference_id = searchParams.get('preference_id');

    useEffect(() => {
        updateOrderStatus();
        clearCookies();
    }, [client_id, collection_id, collection_status, payment_id, status, external_reference, payment_type, merchant_order_id, preference_id])

    async function updateOrderStatus() {
        await fetch(`${ConsumeClientOrderAPI}/update-order-status?${searchParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                payload: {
                    data: {
                        client_id,
                        preference_id,
                        collection_id,
                        collection_status,
                        status,
                        external_reference,
                        payment_type,
                        merchant_order_id,
                    }
                }
            })
        });
        // console.log(response);
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4 pt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-red-600">❌ Pagamento falhou</h1>
                <p className="text-gray-700 mt-4">
                    O pagamento não foi aprovado. Por favor, verifique os dados do cartão ou tente novamente.
                </p>
                {collection_id && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">ID da tentativa:</p>
                        <p className="text-gray-800 font-mono">{collection_id}</p>
                    </div>
                )}
                <button
                    onClick={() => console.log("Voltar para o início")}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition duration-200"
                >
                    Voltar para o início
                </button>
            </div>
        </div>
    );

}