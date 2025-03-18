"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FileWithPath, useDropzone } from "react-dropzone";
import Notification from "@/Components/Notification";
import { ConsumeCategoryAPI, ConsumeImageAPI, ConsumeProductAPI } from "@/backEndRoutes";
import { ProductInterface } from "@/interfaces/Product.interface";
import { CategoryInterface } from "@/interfaces/Category.interface";
import Image from "next/image";

export default function ProductPage() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [creatingProduct, setCreatingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(null);
    const [categories, setCategories] = useState<CategoryInterface[]>([]);
    const [newProduct, setNewProduct] = useState<{
        name: string;
        price: number;
        description: string;
        image: File | null;
        quantity: number;
        categoryId: string;
    }>({
        name: "",
        price: 0,
        description: "",
        image: null,
        quantity: 0,
        categoryId: ""
    });
    const [showNotification, setShowNotification] = useState({
        color: "",
        message: "",
        show: false,
    });
    const authCookies = Cookies.get("authToken");

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    async function fetchProducts() {
        try {
            const response = await fetch(`${ConsumeProductAPI}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + authCookies,
                },
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchCategories() {
        try {
            const response = await fetch(`${ConsumeCategoryAPI}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + authCookies,
                },
            });
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error(error);
            setShowNotification({
                color: "bg-red-500",
                message: "Erro ao buscar categorias.",
                show: true,
            });
        }
    }

    const handleCreateProduct = async () => {
        if (!newProduct.categoryId) {
            setShowNotification({
                color: "bg-yellow-500",
                message: "Por favor, selecione uma categoria.",
                show: true,
            });
            return;
        }

        const formData = new FormData();
        const categoryName = categories.find(category => category.id === parseInt(newProduct.categoryId))?.name;
        formData.append('categoryName', categoryName!);
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price.toString());
        formData.append("description", newProduct.description);
        formData.append("categoryId", newProduct.categoryId);
        formData.append("quantity", newProduct.quantity.toString());
        formData.append('url', `/products/${newProduct.name}.jpg`);
        if (newProduct.image) {
            formData.append("file", newProduct.image);
        }

        try {
            const response = await fetch(`${ConsumeProductAPI}`, {
                method: "POST",
                headers: {
                    authorization: "Bearer " + authCookies,
                },
                body: formData
            });
            if (response.status === 201) {
                const createdProduct = await response.json();
                setProducts((prev) => [...prev, createdProduct]);
                setNewProduct({ name: "", price: 0, description: "", image: null, quantity: 0, categoryId: "" });
                setCreatingProduct(false);
                setShowNotification({
                    color: "bg-green-500",
                    message: "Produto criado com sucesso!",
                    show: true,
                });
            } else {
                const data = await response.json();
                setShowNotification({
                    color: "bg-red-500",
                    message: `Erro ao criar o produto: ${data.message}`,
                    show: true,
                });
            }
        } catch (error) {
            console.error(error);
            setShowNotification({
                color: "bg-red-500",
                message: `Erro ao criar o produto. ${error}`,
                show: true,
            });
        }
    };

    function handleCancelEdit() {
        setEditingProduct(null);

    }

    const handleEditProduct = async () => {
        if (!editingProduct) return;

        // const formData = new FormData();
        // formData.append("name", editingProduct.name);
        // formData.append("price", editingProduct.price.toString());
        // formData.append("description", editingProduct.description);
        // formData.append("categoryId", editingProduct.categoryId);
        // formData.append("quantity", editingProduct.quantity.toString());

        try {
            const response = await fetch(`${ConsumeProductAPI}/${editingProduct.id}`, {
                method: "PUT",
                headers: {
                    authorization: "Bearer " + authCookies,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: editingProduct.name,
                    price: editingProduct.price,
                    description: editingProduct.description,
                    categoryId: editingProduct.categoryId,
                    quantity: editingProduct.quantity
                })
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                setProducts((prev) =>
                    prev.map((product) =>
                        product.id === updatedProduct.id ? updatedProduct : product
                    )
                );
                setEditingProduct(null);
                setShowNotification({
                    color: "bg-green-500",
                    message: "Produto atualizado com sucesso!",
                    show: true,
                });
            } else {
                const data = await response.json();
                setShowNotification({
                    color: "bg-red-500",
                    message: `Erro ao atualizar o produto: ${data.message}`,
                    show: true,
                });
            }
        } catch (error) {
            console.error(error);
            setShowNotification({
                color: "bg-red-500",
                message: "Erro ao atualizar o produto.",
                show: true,
            });
        }
    };

    async function handleDeleteProduct(id: number) {
        try {
            const response = await fetch(`${ConsumeProductAPI}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + authCookies,
                },
            });
            if (response.ok) {
                setProducts((prev) => prev.filter((product) => product.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: FileWithPath[]) => {
            console.log('Arquivo recebido:', acceptedFiles);
            if (editingProduct) {
                setEditingProduct((prev) => ({ ...prev!, image: acceptedFiles[0] }));
            } else {
                setNewProduct((prev) => ({ ...prev, image: acceptedFiles[0] }));
            }
        },
    });


    return (
        <div className="flex flex-col gap-6 mt-4">
            <button
                onClick={() => setCreatingProduct(!creatingProduct)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
            >
                {creatingProduct ? "Cancelar" : "Criar Produto"}
            </button>
            {creatingProduct && (
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Novo Produto</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, name: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                            value={newProduct.categoryId}
                            name="category"
                            id="categorySelect"
                            className="w-full h-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((category: CategoryInterface) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <div className="">
                            <label>Preço: </label>
                            <input
                                type="number"
                                placeholder="Preço do produto"
                                value={newProduct.price}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, price: +e.target.value })
                                }
                                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="">
                            <label>Quantidade: </label>
                            <input
                                type="number"
                                placeholder="Quantidade"
                                value={newProduct.quantity}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, quantity: +e.target.value })
                                }
                                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <textarea
                            placeholder="Descrição do produto"
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, description: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div
                            {...getRootProps({
                                className:
                                    "border border-dashed border-gray-400 p-4 text-center cursor-pointer rounded-md",
                            })}
                        >
                            <input {...getInputProps()} />
                            {newProduct.image ? (
                                <p>{(newProduct.image as FileWithPath).name}</p>
                            ) : (
                                <p>Arraste e solte uma imagem ou clique para selecionar</p>
                            )}
                        </div>
                        <button
                            onClick={handleCreateProduct}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                        >
                            Salvar Produto
                        </button>
                    </div>
                </div>
            )}

            {editingProduct && (
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Editar Produto</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            value={editingProduct.name}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, name: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                            value={editingProduct.categoryId}
                            name="category"
                            id="editCategorySelect"
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((category: CategoryInterface) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Preço do produto"
                            value={editingProduct.price}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, price: +e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Quantidade"
                            value={editingProduct.quantity}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, quantity: +e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Descrição do produto"
                            value={editingProduct.description}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, description: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleEditProduct}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                        >
                            Atualizar Produto
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product: ProductInterface) => (
                    <div
                        key={product.id}
                        className="bg-white border border-gray-300 rounded-lg p-4 shadow-md flex flex-col gap-2"
                    >
                        <Image
                            src={`${ConsumeImageAPI}${product.url}`}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-32 object-cover rounded-md"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                        <p className="text-sm text-gray-600">R$ {product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Quantidade: {product.quantity}</p>
                        <p className="text-sm text-gray-600">{product.description ? product.description : "Sem descrição"}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingProduct(product)}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
