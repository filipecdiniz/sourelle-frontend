"use client";
import clearCookies from "@/utils/clearCookies";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function PaymentPendingContent() {
    const searchParams = useSearchParams();
    const collection_id = searchParams.get("collection_id");

    useEffect(() => {
        clearCookies();
    }, [collection_id]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4 pt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-yellow-600">⏳ Pagamento pendente</h1>
                <p className="text-gray-700 mt-4">
                    Seu pagamento ainda está sendo processado. Por favor, aguarde a confirmação ou entre em contato
                    com o suporte caso tenha dúvidas.
                </p>
                {collection_id && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">ID da transação:</p>
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

export default function PaymentFailurePage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <PaymentPendingContent />
        </Suspense>
    );
}