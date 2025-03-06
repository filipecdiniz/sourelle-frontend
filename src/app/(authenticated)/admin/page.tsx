"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="flex flex-col p-4 gap-6">
            <header className="flex items-center justify-between mb-6">
                <h1 className="font-serif text-3xl font-semibold text-gray-900">
                    Painel Administrativo
                </h1>
                <Link
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-base font-medium transition duration-200"
                >
                    Voltar para o site
                </Link>
            </header>

            <div className="flex gap-6">
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`py-4 px-8 rounded-lg font-medium transition duration-200 text-base ${
                        activeTab === "orders"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                >
                    Pedidos
                </button>
                <button
                    onClick={() => setActiveTab("coupons")}
                    className={`py-4 px-8 rounded-lg font-medium transition duration-200 text-base ${
                        activeTab === "coupons"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                >
                    Cadastrar Cupons
                </button>
                <button
                    onClick={() => setActiveTab("products")}
                    className={`py-4 px-8 rounded-lg font-medium transition duration-200 text-base ${
                        activeTab === "products"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                >
                    Cadastrar Produtos
                </button>
                <button
                    onClick={() => setActiveTab("categories")}
                    className={`py-4 px-8 rounded-lg font-medium transition duration-200 text-base ${
                        activeTab === "categories"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                >
                    Cadastrar Categorias
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "orders" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Pedidos</h2>
                        <p className="text-gray-600">Aqui você pode visualizar os pedidos realizados.</p>
                    </div>
                )}

                {activeTab === "coupons" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Cupons</h2>
                        <p className="text-gray-600">Aqui você pode cadastrar novos cupons de desconto.</p>
                    </div>
                )}

                {activeTab === "products" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Produtos</h2>
                        <p className="text-gray-600">Aqui você pode cadastrar novos produtos.</p>
                    </div>
                )}

                {activeTab === "categories" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Categorias</h2>
                        <p className="text-gray-600">Aqui você pode cadastrar novas categorias de produtos.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
