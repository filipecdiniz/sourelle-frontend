import HomeCategories from "@/Components/HomeCategories";
import ListProducts from "@/Components/ListProducts";
import ListProductsDrag from "@/Components/ListProductsDrag";

export default function Home() {
  return (
    <div className="screen bg-gray-100 ">
      {/* WELCOME SECTION */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <p className="text-xl font-serif text-gray-800">
          <span className="font-bold text-gray-900 text-2xl">Bem-vinda!</span> <br />
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
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Novidades Sourelle</h2>
        <ListProducts />
      </div>

      {/* BOTTOM */}
      <div className="justify-center items-center text-center mt-6">
        <h2 className="font-serif text-2xl font-semibold text-gray-900">Todos os Produtos</h2>
        <ListProductsDrag />
      </div>
    </div>
  );
}
