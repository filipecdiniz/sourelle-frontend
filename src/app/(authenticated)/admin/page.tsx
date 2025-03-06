"use client";

import { useState } from "react";
import Link from "next/link";
import '../../globals.css';
import OrdersPage from "../components/OrdersPage";
import Image from "next/image";
import CupomPage from "./cupom/page";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="flex flex-col p-4 gap-6">
            <header className="flex flex-row items-center mb-6 gap-4">
                <Link
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-200"
                >
                    <Image
                        src="/seta_para_tras.png"
                        alt="Voltar"
                        width={24}
                        height={24}
                    ></Image>
                </Link>
                <h1 className="font-serif text-3xl font-semibold text-gray-900">
                    Painel Administrativo
                </h1>

            </header>

            <nav className="flex flex-col gap-4 items-center">
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "orders"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("orders")}
                >
                    Pedidos
                </Link>
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "coupons"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("coupons")}
                >
                    Cadastrar Cupons
                </Link>
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "products"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("products")}
                >
                    Cadastrar Produtos
                </Link>
                <Link
                    href="/admin"
                    className={`py-4 px-12 w-3/4 text-center rounded-lg font-medium transition duration-200 text-lg ${activeTab === "categories"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("categories")}
                >
                    Cadastrar Categorias
                </Link>
            </nav>

            <div className="mt-6">
                {activeTab === "orders" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Pedidos</h2>
                        <p className="text-gray-600">Aqui você pode visualizar os pedidos realizados.</p>
                        <OrdersPage></OrdersPage>
                    </div>
                )}

                {activeTab === "coupons" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Cupons</h2>
                        <p className="text-gray-600">Aqui você pode cadastrar novos cupons de desconto.</p>
                        <CupomPage></CupomPage>
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
