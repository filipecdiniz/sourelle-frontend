import HomeCategories from "@/Components/HomeCategories";
import ListProducts from "@/Components/ListProducts";
import ListProductsDrag from "@/Components/ListProductsDrag";

export default function Home() {
  return (
    <div className="screen">
      {/* CATEGORIES TOP */}
      <div className="">
        <HomeCategories />
      </div>

      {/* MOST SOLD PRODUCTS MIDDLE */}
      <div className="justify-center items-center text-center">
        <div className="font-serif text-2xl">Mais Vendidos</div>
        <ListProducts />
      </div>
      {/* BOTTOM */}
      <div className="justify-center items-center text-center mt-6">
        <div className="font-serif text-2xl">Todos os Produtos</div>
        <ListProductsDrag />
      </div>
    </div>
  );
}
