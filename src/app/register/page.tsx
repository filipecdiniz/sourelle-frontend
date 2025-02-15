"use client";

import { ConsumeUsersAPI } from "@/backEndRoutes";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar o hook de roteamento

interface UserDTO {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<UserDTO>({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState<Partial<UserDTO>>({});
    const router = useRouter(); // Inicializar o roteador

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "").slice(0, 11);
            setFormData((prevData) => ({
                ...prevData,
                [name]: numericValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    function validateForm() {
        const newErrors: Partial<UserDTO> = {};

        if (!formData.name.trim()) newErrors.name = "O nome é obrigatório.";
        if (!formData.email.trim()) newErrors.email = "O e-mail é obrigatório.";
        if (!formData.phone.trim()) newErrors.phone = "O celular é obrigatório.";
        if (formData.phone.length < 11) newErrors.phone = "O celular deve ter 11 dígitos.";
        if (!formData.password.trim()) newErrors.password = "A senha é obrigatória.";
        if (formData.password.length < 6)
            newErrors.password = "A senha deve ter pelo menos 6 caracteres.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function registerUser(event: React.FormEvent) {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch(`${ConsumeUsersAPI}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data)
            
            if (response.ok) {
                alert("Conta criada com sucesso!");
                router.push("/login"); // Redirecionar para a página de login
            }
            if (data.statusCode === 400) {
                alert('Email ja cadastrado.')
            }
            else {
                alert(data.message || "Erro ao criar conta.");
            }
        } catch (error) {
            alert("Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    Criar uma Conta
                </h1>
                <p className="text-gray-600 text-center mt-1">
                    Compre e gerencie seus pedidos!
                </p>

                <form className="flex flex-col mt-4 space-y-4" onSubmit={registerUser}>
                    <div>
                        <label className="block text-gray-700 font-medium">Nome completo</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none ${errors.name ? "border-red-500" : ""
                                }`}
                            placeholder="Ex: João Silva"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none ${errors.email ? "border-red-500" : ""
                                }`}
                            placeholder="Ex: joao@gmail.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Celular</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none ${errors.phone ? "border-red-500" : ""
                                }`}
                            placeholder="Ex: 62984689961"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none ${errors.password ? "border-red-500" : ""
                                }`}
                            placeholder="Digite sua senha"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
                    >
                        Criar Conta
                    </button>
                </form>
            </div>
        </div>
    );
}
