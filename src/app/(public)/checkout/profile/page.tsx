"use client";

import Notification from "@/Components/Notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { cpfValidator } from "@/utils/cpf-validator";

export default function PersonalInfoPage() {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        cpf: "",
    });
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });
    const router = useRouter();
    // const [showPassword, setShowPassword] = useState(false);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        if (name === "cpf" || name === "phone") {
            const onlyDigits = value.replace(/\D/g, '').substring(0, 11);
            setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
        } else if (name === 'password') {
            const limitedValue = value.substring(0, 12);
            setFormData((prev) => ({ ...prev, [name]: limitedValue }));
        } else if (name === 'email') {
            const limitedValue = value.substring(0, 50);
            setFormData((prev) => ({ ...prev, [name]: limitedValue }));
        } else {
            const limitedValue = value.substring(0, 20);
            setFormData((prev) => ({ ...prev, [name]: limitedValue }));
        }
    };

    function handleSubmit() {
        const { name, lastName, email, cpf } = formData;

        // const validateCPF = cpfValidator(cpf);
        if (!name || !email || !cpf || !lastName ) {
            setShowNotification({
                color: "bg-red-500",
                message: "Por favor, preencha todos os campos.",
                show: true,
            });
            return;
        }

        if (!cpfValidator(cpf)) {
            setShowNotification({
                color: "bg-red-500",
                message: "Por favor, insira um CPF válido.",
                show: true,
            });
            return;
        }

        Cookies.set("user", JSON.stringify(formData));
        router.push("/checkout/address/frete");
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
                <h1 className="text-center text-2xl font-bold text-sourelle_main_color mb-4">
                    FINALIZAR COMPRA
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Para finalizar a compra, preencha suas informações pessoais.
                </p>

                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Sobrenome"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Celular (62984689961)"
                    value={formData.phone}
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
                {/* <div className="relative w-full mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showPassword ? "Esconder" : "Mostrar"}
                    </button>
                </div> */}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-sourelle_main_color hover:bg-sourelle_main_color text-white py-3 rounded-md text-sm font-medium transition duration-200"
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
