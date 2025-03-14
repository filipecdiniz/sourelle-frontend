"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CupomPage from "./cupom/page";
import AdminOrderPage from "./pedidos/page";
import ProductPage from "./produtos/page";
import CategoryAdminPage from "./categoria/page";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="flex flex-col p-4 gap-6">
            <header className="flex flex-row items-center mb-6 gap-4">
                <Link
                    href="/"
                    className="bg-sourelle_main_color hover:bg-sourelle_main_color text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-200"
                >
                    <Image
                        src="/seta_para_tras.png"
                        alt="Voltar"
                        width={24}
                        height={24}
                    />
                </Link>
                <h1 className="font-serif text-3xl font-semibold text-gray-900">
                    Painel Administrativo
                </h1>
            </header>

            <nav className="flex flex-col gap-4 items-center">
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "dashboard"
                        ? "bg-sourelle_main_color text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("dashboard")}
                >
                    Dashboard
                </Link>
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "orders"
                        ? "bg-sourelle_main_color text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("orders")}
                >
                    Pedidos
                </Link>
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "coupons"
                        ? "bg-sourelle_main_color text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("coupons")}
                >
                    Cupons
                </Link>
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "produtos"
                        ? "bg-sourelle_main_color text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("produtos")}
                >
                    Produtos
                </Link>
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "categories"
                        ? "bg-sourelle_main_color text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("categories")}
                >
                    Categorias
                </Link>
            </nav>

            <div className="mt-6">
                {activeTab === "dashboard" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
                        <p className="text-gray-600">Aqui você pode visualizar suas vendas.</p>
                        {/* <AdminOrdersPage /> */}
                    </div>
                )}
                {activeTab === "orders" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
                        <p className="text-gray-600">Aqui você pode visualizar os pedidos realizados.</p>
                        <AdminOrderPage />
                    </div>
                )}

                {activeTab === "coupons" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Cupons</h2>
                        <p className="text-gray-600">Aqui você pode cadastrar novos cupons de desconto.</p>
                        <CupomPage />
                    </div>
                )}

                {activeTab === "produtos" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Produtos</h2>
                        <p className="text-gray-600">Aqui você pode cadastrar novos produtos.</p>
                        <ProductPage />
                    </div>
                )}

                {activeTab === "categories" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Categorias</h2>
                        <p className="text-gray-600">Aqui você pode cadastrar novas categorias de produtos.</p>
                        <CategoryAdminPage></CategoryAdminPage>
                    </div>
                )}
            </div>
        </div>
    );
}