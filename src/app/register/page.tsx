"use client";

import { ConsumeUsersAPI } from "@/backEndRoutes";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        const fieldName = name as keyof UserDTO;

        if (fieldName === "phone") {
            const numericValue = value.replace(/\D/g, "").slice(0, 11);
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: numericValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: undefined,
        }));
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

            if (response.ok) {
                alert("Conta criada com sucesso!");
                router.push("/login");
            } else if (data.statusCode === 400 && data.message.includes("email")) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Este e-mail já está cadastrado.",
                }));
            } else {
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
                    {(["name", "email", "phone", "password"] as Array<keyof UserDTO>).map((field) => (
                        <div key={field}>
                            <label className="block text-gray-700 font-medium">
                                {field === "name"
                                    ? "Nome completo"
                                    : field === "email"
                                    ? "E-mail"
                                    : field === "phone"
                                    ? "Celular"
                                    : "Senha"}
                            </label>
                            <input
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none ${
                                    errors[field] ? "border-red-500" : ""
                                }`}
                                placeholder={
                                    field === "name"
                                        ? "Ex: João Silva"
                                        : field === "email"
                                        ? "Ex: joao@gmail.com"
                                        : field === "phone"
                                        ? "Ex: 62984689961"
                                        : "Digite sua senha"
                                }
                            />
                            {errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                            )}
                        </div>
                    ))}

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
