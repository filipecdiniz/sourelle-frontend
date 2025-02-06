import HomeCategories from "@/Components/HomeCategories";
import ListProducts from "@/Components/ListProducts";

export default function Home() {
  return (
    <div className="screen">
      {/* CATEGORIES TOP */}
      <div className="">
        <HomeCategories />
      </div>

      {/* PRODUCTS BOTTOM */}
      <div className="justify-center items-center text-center">
        <div className="font-serif text-2xl">Mais Vendidos</div>
        <ListProducts />
      </div>
    </div>
  );
}
