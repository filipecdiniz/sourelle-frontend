"use client"

import { ConsumeClientOrderAPI } from "@/backEndRoutes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import OrderInterface from "@/interfaces/Order/Order.interface";
import { ProductOrderInterface } from "@/interfaces/Product.interface";

export default function AdminOrderPage() {
    const authCookies = Cookies.get('authToken');

    const [filterStatus, setFilterStatus] = useState("approved");
    const [filterDelivered, setFilterDelivered] = useState('false');
    const [orders, setOrders] = useState<OrderInterface[]>([]);

    useEffect(() => {
        getOrders(filterStatus, filterDelivered);
    }, [filterStatus, filterDelivered]);

    function formatPhone(phone: string): string {
        phone = phone.replace(/\D/g, '');
        if (phone.length === 11) {
            return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
        }
        return phone;
    }

    async function handleDelivery(orderId: number) {
        const confirmDelivery = confirm('Deseja realmente marcar como entregue?');
        if (!confirmDelivery) return;
        await fetch(`${ConsumeClientOrderAPI}/upload-delivered-status/${orderId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${authCookies}`
            },
            body: JSON.stringify({
                delivered: true
            })
        });

        getOrders(filterStatus, filterDelivered);
    }

    async function handleUndoneDelivery(orderId: number) {
        await fetch(`${ConsumeClientOrderAPI}/undone-delivery-status/${orderId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${authCookies}`
            },
            body: JSON.stringify({
                delivered: true
            })
        });
        getOrders(filterStatus, filterDelivered);
    }

    async function getOrders(status?: string, delivered?: string) {
        // console.log(delivered)
        // const response = await fetch(`${ConsumeClientOrderAPI}?status=pending`, {
        const response = await fetch(`${ConsumeClientOrderAPI}?status=${status}&delivered=${delivered}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${authCookies}`
            }
        }
        );
        const data = await response.json();
        console.log(data);
        setOrders(data);
    }

    return (
        <div className="flex flex-col gap-6 mt-4">
            <div className="filtros bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md">
                <p className="text-lg font-semibold text-gray-700 mb-4">Filtros:</p>
                <div className="flex flex-col gap-4">
                    {/* STATUS */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-600">Pagamento:</label>
                        <select
                            value={filterStatus}
                            className="w-full border border-blue-300 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
                        >
                            <option value="pending">Pendente</option>
                            <option value="approved">Aprovado</option>
                            <option value="failure">Cancelado</option>
                        </select>
                    </div>

                    {/* DELIVERED */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-600">Situação:</label>
                        <select
                            value={filterDelivered}
                            className="w-full border border-green-300 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterDelivered(e.target.value)}
                        >
                            <option value="false">Não entregue</option>
                            <option value="true">Entregue</option>
                        </select>
                    </div>
                </div>
            </div>


            {orders.map((order: OrderInterface) => (
                <div
                    key={order.id}
                    className="bg-white border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-6"
                >
                    {/* Informações do Cliente */}
                    <div className="border border-blue-400 rounded-lg p-4 bg-blue-50">
                        <h2 className="text-lg font-bold text-blue-700">Informações do Cliente</h2>
                        <p className="text-gray-800">
                            Nome: {order.client.name} {order.client.lastName}
                        </p>
                        <p className="text-gray-800">
                            Data do Pedido:{" "}
                            {new Date(order.orderDate).toLocaleString("pt-BR", {
                                timeZone: "America/Sao_Paulo",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                        <p className="text-gray-800">
                            Pagamento:{" "}
                            {order.status === "approved"
                                ? "Aprovado"
                                : order.status === "failure"
                                    ? "Cancelado"
                                    : "Pendente"}
                        </p>
                        <p className="text-gray-800">
                            Número: {formatPhone(order.client.phone)}
                        </p>
                        <p className="text-gray-800">
                            Email: {order.client.email}
                        </p>
                    </div>

                    {/* Endereço */}
                    <div className="border border-green-400 rounded-lg p-4 bg-green-50">
                        <h2 className="text-lg font-bold text-green-700">Endereço</h2>
                        <p className="text-gray-800">
                            Bairro: {order.address.district}, {order.address.city} -{" "}
                            {order.address.state}
                        </p>
                        <p className="text-gray-800">
                            Rua: {order.address.street}, {order.address.number} -{" "}
                            {order.address.complement}
                        </p>
                        <p className="text-gray-800">
                            Complemento: {order.address.complement}
                        </p>
                    </div>

                    {/* Produtos */}
                    <div className="border border-purple-400 rounded-lg p-4 bg-purple-50">
                        <h2 className="text-lg font-bold text-purple-700">Produtos</h2>
                        {order.products.map((product: ProductOrderInterface) => (
                            <div
                                key={product.product.id}
                                className="flex flex-col justify-between items-center border-b border-purple-200 py-2"
                            >
                                <p className="text-gray-800">
                                    Nome: {product.product.name}
                                </p>
                                <p className="text-gray-800">
                                    Quantidade: {product.amount}
                                </p>
                                <p className="text-gray-800">
                                    Preço: R$ {product.product.price !== undefined && product.product.price !== null ? product.product.price.toFixed(2) : "0.00"}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4">
                        {order.delivered ? (
                            <button
                                onClick={() => handleUndoneDelivery(order.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                            >
                                Marcar como Não Entregue
                            </button>
                        ) : (
                            <button
                                onClick={() => handleDelivery(order.id)}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                            >
                                Marcar como Entregue
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}