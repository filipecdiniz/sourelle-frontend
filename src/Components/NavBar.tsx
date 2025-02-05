import Image from "next/image";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import CartMenu from "./CartMenu";

export default function NavBar() {

    return (
        <div className="">
            <div className="flex p-5 items-center justify-between">
                {/* LEFT */}
                <div className="">
                    <Menu />
                </div>
                {/* LOGO MIDDLE */}
                <div className="justify-center items-center text-center">
                    <div className="text-lg font-serif">SOURELLE</div>
                    <div className="text-sm font-serif">pratas</div>
                </div>

                {/* RIGHT */}
                <CartMenu />
            </div>
            <div className="flex justify-center">
                <SearchBar />
            </div>
        </div>
    )

}