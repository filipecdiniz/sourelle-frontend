"use client"

import { useState } from "react";

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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    
    async function registerUser(event: React.FormEvent) {
        event.preventDefault(); 

        const response = await fetch(`http://localhost:3000/user/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Resposta do servidor:", data);
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
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            placeholder="Ex: João Silva"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            placeholder="Ex: joao@gmail.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Celular</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            placeholder="Ex: 62984689961"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            placeholder="Confirme sua senha"
                        />
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
