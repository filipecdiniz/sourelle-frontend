import { ConsumeCupomAPI } from "@/backEndRoutes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CupomInterface from "@/interfaces/Cupom.interface";
import Notification from "@/Components/Notification";

export default function CupomPage() {
    const [cupons, setCupons] = useState<CupomInterface[]>([]);
    const [editingId, setEditingId] = useState(null);
    const [editedCupom, setEditedCupom] = useState<CupomInterface>({
        id: 0,
        cupom: "",
        percentage: 0,
        expires: new Date(),
        shipping: false,
        created_at: new Date(),
        updated_at: new Date(),
    });
    const [creatingCupom, setCreatingCupom] = useState(false);
    const [newCupom, setNewCupom] = useState({
        cupom: "",
        percentage: 0,
        expires: "",
        shipping: false,
    });

    useEffect(() => {
        fetchAPI();
    }, []);

    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });
    const authCookies = Cookies.get("authToken");

    const handleEdit = (cupom: any) => {
        setEditingId(cupom.id);
        setEditedCupom({ ...cupom });
    };

    const handleSave = () => {
        setCupons((prev: any) =>
            prev.map((cupom: any) => (cupom.id === editingId ? editedCupom : cupom))
        );
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedCupom({
            id: 0,
            cupom: "",
            percentage: 0,
            expires: new Date(),
            shipping: false,
            created_at: new Date(),
            updated_at: new Date(),
        });
    };

    const handleCreateCupom = async () => {
        const newCupomData = {
            ...newCupom,
            cupom: newCupom.cupom.toUpperCase(),
        };
        try {
            const response = await fetch(`${ConsumeCupomAPI}/create-new-cupom`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + authCookies,
                },
                body: JSON.stringify({
                    cupom: newCupomData.cupom,
                    percentage: newCupomData.percentage,
                    expires: newCupomData.expires,
                    shipping: newCupomData.shipping,
                }),
            });
            const data = await response.json();
            if (response.status === 201) {
                const createdCupom = await response.json();
                setCupons((prev) => [...prev, createdCupom]);
                setNewCupom({ cupom: "", percentage: 0, expires: "", shipping: false });
                setCreatingCupom(false);
                setShowNotification({
                    color: "bg-green-500",
                    message: "Cupom criado com sucesso!",
                    show: true,
                });
                // fetchAPI();
            } else {
                // console.error(error);
                setShowNotification({
                    color: "bg-red-500",
                    message: `Erro ao criar o cupom: ${data.message}`,
                    show: true,
                });
            }
        } catch (error) {
            console.error(error);
            setShowNotification({
                color: "bg-red-500",
                message: "Erro ao criar o cupom.",
                show: true,
            });
        }
    };

    async function handleDelete(id: any) {
        try {
            const response = await fetch(`${ConsumeCupomAPI}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + authCookies,
                },
            });
            if (response.ok) {
                setCupons((prev) => prev.filter((cupom) => cupom.id !== id));
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async function fetchAPI() {
        try {
            const response = await fetch(`${ConsumeCupomAPI}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + authCookies,
                },
            });
            const data = await response.json();
            console.log(data);
            setCupons(data);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Cupons</h1>
            <button
                onClick={() => setCreatingCupom(!creatingCupom)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
            >
                {creatingCupom ? "Cancelar" : "Criar Cupom"}
            </button>

            {creatingCupom && (
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Novo Cupom</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Código do cupom (8 a 10 caracteres)"
                            maxLength={10}
                            minLength={8}
                            value={newCupom.cupom}
                            onChange={(e) =>
                                setNewCupom({ ...newCupom, cupom: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Percentual de desconto"
                            value={newCupom.percentage}
                            onChange={(e) =>
                                setNewCupom({ ...newCupom, percentage: +e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="datetime-local"
                            value={newCupom.expires}
                            onChange={(e) =>
                                setNewCupom({ ...newCupom, expires: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-2">
                            <input
                                className="w-4 h-4"
                                type="checkbox"
                                checked={newCupom.shipping}
                                onChange={(e) =>
                                    setNewCupom({ ...newCupom, shipping: e.target.checked })
                                }
                            />
                            <label className="text-sm text-gray-700">Frete Grátis</label>
                        </div>
                        <button
                            onClick={handleCreateCupom}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                        >
                            Salvar Cupom
                        </button>
                    </div>
                </div>
            )}

            {cupons.map((cupom) => (
                <div
                    key={cupom.id}
                    className="bg-white border border-gray-300 rounded-lg p-4 shadow-md flex flex-col gap-2"
                >
                    {editingId === cupom.id ? (
                        <>
                            <input
                                type="text"
                                value={editedCupom.cupom}
                                onChange={(e) =>
                                    setEditedCupom((prev) => ({
                                        ...prev,
                                        cupom: e.target.value,
                                    }))
                                }
                                className="border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg font-semibold text-gray-800">{cupom.cupom}</h2>
                            <p className="text-sm text-gray-600">
                                Expira em: {new Date(cupom.expires).toLocaleString("pt-BR", {
                                    timeZone: "America/Sao_Paulo",
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            <p className="text-sm text-gray-600">Envio: {cupom.shipping ? "Sim" : "Não"}</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEdit(cupom)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(cupom.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                                >
                                    Excluir
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}

            <Notification
                show={showNotification.show}
                color={showNotification.color}
                message={showNotification.message}
                onClose={() =>
                    setShowNotification({ ...showNotification, show: false })
                }
            />
        </div>
    );
}
