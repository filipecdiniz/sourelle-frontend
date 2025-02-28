"use client";

import Notification from "@/Components/Notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function PersonalInfoPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        email: "",
        cpf: "",
    });
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });
    const router = useRouter();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateCPF = (cpf: string) => {
        return /^\d{11}$/.test(cpf);
    };


    const handleSubmit = () => {
        const { firstName, middleName, email, cpf } = formData;

        if (!firstName || !email || !cpf) {
            setShowNotification({
                color: "bg-red-500",
                message: "Por favor, preencha todos os campos.",
                show: true,
            });
            return;
        }

        if (!validateCPF(cpf)) {
            setShowNotification({
                color: "bg-red-500",
                message: "Por favor, insira um CPF válido.",
                show: true,
            });
            return;
        }

        Cookies.set("personalInfo", JSON.stringify(formData));
        router.push("/checkout/address");
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
                <h1 className="text-center text-2xl font-bold text-blue-600 mb-4">
                    FINALIZAR COMPRA
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Para finalizar a compra, preencha suas informações pessoais.
                </p>

                <input
                    type="text"
                    name="firstName"
                    placeholder="Nome"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="middleName"
                    placeholder="Sobrenome"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="cpf"
                    placeholder="CPF (XXX.XXX.XXX-XX)"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-sm font-medium transition duration-200"
                >
                    CONTINUAR
                </button>

                <div className="mt-6">
                    <h2 className="text-sm font-bold text-gray-700 mb-2">
                        USAMOS SUAS INFORMAÇÕES DE FORMA 100% SEGURA PARA:
                    </h2>
                    <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                        <li>Identificar seu perfil</li>
                        <li>Notificar sobre o andamento do seu pedido</li>
                        <li>Gerenciar seu histórico de compras</li>
                        <li>Acelerar o preenchimento de suas informações</li>
                    </ul>
                </div>
            </div>

            <Notification
                color={showNotification.color}
                message={showNotification.message}
                show={showNotification.show}
                onClose={() =>
                    setShowNotification((prev) => ({ ...prev, show: false }))
                }
            />
        </div>
    );
}
