import SearchBar from "./SearchBar";
import Menu from "./Menu";
import CartMenu from "./CartMenu";
import Link from "next/link";
import PromoBanner from "./PromoBanner";

export default function NavBar() {
    return (
        <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#FCE4EC] to-[#F8D7DA]">
            <div className="border-b-2 shadow-lg p-4 mt-2">
                <div className="flex items-center text-center justify-between">
                    {/* LEFT */}
                    <div className="flex items-center gap-6">
                        <Menu />
                    </div>

                    {/* LOGO MIDDLE */}
                    <Link href='/'>
                        <div className="text-center">
                            <div className="font-playfair text-5xl font-bold text-[#3F2A47] tracking-wide">
                                SOURELLE
                            </div>
                            <div className="text-base font-light text-[#915F78] uppercase tracking-widest">
                                pratas
                            </div>
                        </div>
                    </Link>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">
                        <CartMenu />
                    </div>
                </div>
                {/* Search Bar */}
                <div className="flex justify-center mt-4">
                    <SearchBar />
                </div>
            </div>
            {/* Promo Banner */}
            <PromoBanner />
        </div>
    );
}
