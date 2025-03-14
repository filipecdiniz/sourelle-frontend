import { ConsumeCupomAPI } from "@/backEndRoutes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CupomInterface from "@/interfaces/Cupom.interface";
import Notification from "@/Components/Notification";

export default function CategoryAdminPage() {
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

            if (response.status === 201) {
                // console.log(response.status);
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
                const data = await response.json();
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
        <div className="">

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
