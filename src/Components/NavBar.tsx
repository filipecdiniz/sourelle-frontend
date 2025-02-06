import SearchBar from "./SearchBar";
import Menu from "./Menu";
import CartMenu from "./CartMenu";
import Link from "next/link";

export default function NavBar() {

    return (
        <div className="border-b-2 shadow-[0_3px_10px_rgb(0,0,0,0.4)] p-2 sticky top-0 z-50 bg-white">
            <div className="flex p-5 items-center justify-between">
                {/* LEFT */}
                <div className="">
                    <Menu />
                </div>
                {/* LOGO MIDDLE */}
                <Link href='/'>
                    <div className="justify-center items-center text-center">
                        <div className="font-mono text-3xl">SOURELLE</div>
                        <div className="text-sm font-serif">pratas</div>
                    </div>
                </Link>

                {/* RIGHT */}
                <CartMenu />
            </div>
            <div className="flex justify-center">
                <SearchBar />
            </div>
        </div>
    )

}