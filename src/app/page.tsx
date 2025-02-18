"use client"

import { useEffect, useState } from "react";
import HomeCategories from "@/Components/HomeCategories";
import ListProductsDrag from "@/Components/ListProductsDrag";
import { ConsumeUsersAPI } from "@/backEndRoutes";
import Cookies from "js-cookie";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    getUserInformations(authToken)
  }, [authToken]);

  async function getUserInformations(authToken: string | undefined) {
    if (authToken) {
      const response = await fetch(`${ConsumeUsersAPI}`, {
        headers: {
          Authorization: `Baerer ${authToken}`,
        }
      })
      const user = await response.json().then((response) => response)
      setUserName(user.name.split(' ')[0])
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* WELCOME SECTION */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <p className="text-xl font-serif text-gray-800">
          <span className="font-bold text-gray-900 text-2xl">
            Bem-vindo(a) {userName ? `, ${userName}` : ""}!
          </span>
          <br />
          Obrigada por dividir esse momento com a gente.
        </p>
        <p className="text-gray-700 mt-2">
          Cada peça foi escolhida com muito carinho e tem um significado especial.
          Escolha a sua e leve esse sentimento com você. 💖
          <br />
          <span className="italic">Esperamos que goste!</span>
        </p>
      </div>

      {/* CATEGORIES TOP */}
      <div className="mt-6">
        <HomeCategories />
      </div>

      {/* MOST SOLD PRODUCTS MIDDLE */}
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Anéis</h2>
        <ListProductsDrag
          categoryId={1}
        />
      </div>

      {/* BOTTOM */}
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Brincos</h2>
        <ListProductsDrag
          categoryId={2}
        />
      </div>
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Conjuntos</h2>
        <ListProductsDrag
          categoryId={6}
        />
      </div>
    </div>
  );
}
