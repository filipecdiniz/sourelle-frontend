"use client";

import { ConsumeLoginAPI } from "@/backEndRoutes";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface UserDTO {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState<UserDTO>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Partial<UserDTO>>({});

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        const fieldName = name as keyof UserDTO;

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: undefined,
        }));
    }

    function validateForm() {
        const newErrors: Partial<UserDTO> = {};

        if (!formData.email.trim()) {
            newErrors.email = "O e-mail é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Formato de e-mail inválido.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "A senha é obrigatória.";
        } else if (formData.password.length < 6) {
            newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function loginUser(event: React.FormEvent) {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch(`${ConsumeLoginAPI}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login realizado com sucesso!");
                Cookies.set("authToken", data.accessToken, { expires: 7 }); // Armazena o token por 7 dias
                router.push("/");
            } else {
                alert("Email ou senha incorretos!");
            }
        } catch (error) {
            alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    Fazer Login
                </h1>

                <form className="flex flex-col mt-4 space-y-4" onSubmit={loginUser}>
                    <div>
                        <label className="block text-gray-700 font-medium">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            placeholder="Ex: joao@gmail.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none ${
                                errors.password ? "border-red-500" : ""
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
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
