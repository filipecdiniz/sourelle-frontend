"use client";

import HomeCategories from "@/Components/HomeCategories";
import ListProductsDrag from "@/Components/ListProductsDrag";

export default function Home() {

  // const authToken = Cookies.get("authToken");

  // useEffect(() => {
  //   getUserInformations(authToken);
  // }, [authToken]);

  // async function getUserInformations(authToken: string | undefined) {
  //   if (!authToken) {
  //     return;
  //   }
  //   if (authToken) {
  //     const response = await fetch(`${ConsumeUsersAPI}`, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const user = await response.json();
  //       setUserName(user.name.split(" ")[0]);
  //       return;
  //     } else {
  //       Cookies.remove("authToken");
  //       return;
  //     }
  //     syncCart();
  //   }
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SEARCH RESULTS */}
      {/* <SearchResults/> */}
      {/* WELCOME SECTION */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <p className="text-xl font-serif text-gray-800">
          {/* <span className="font-bold text-gray-900 text-2xl">
            Bem-vindo(a) {userName ? `, ${userName}` : ""}!
          </span>
          <br /> */}
          <span className="font-bold text-gray-900 text-3xl">
            Bem-vindo(a)!
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
        <ListProductsDrag categoryId={1} />
      </div>
      {/* BOTTOM */}
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Brincos</h2>
        <ListProductsDrag categoryId={2} />
      </div>
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Argolas</h2>
        <ListProductsDrag categoryId={3} />
      </div>
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Pulseiras</h2>
        <ListProductsDrag categoryId={4} />
      </div>
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Colares</h2>
        <ListProductsDrag categoryId={5} />
      </div>
      {/* BOTTOM */}
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Conjuntos</h2>
        <ListProductsDrag categoryId={6} />
      </div>
    </div>
  );
}
