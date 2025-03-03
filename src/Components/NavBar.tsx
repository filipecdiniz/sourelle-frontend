import SearchBar from "./SearchBar";
import Menu from "./Menu";
import CartMenu from "./CartMenu";
import Link from "next/link";
import PromoBanner from "./PromoBanner";
import { Roboto } from 'next/font/google'

const logoFont = Roboto({
    weight: '300',
    subsets: ['latin'],
})

export default function NavBar() {
    return (
        <div className="sticky top-0 z-50 w-full bg-sourelle_main_color">
            <div className="border-b-2 shadow-lg p-4 mt-2">
                <div className="flex items-center text-center justify-between">
                    {/* LEFT */}
                    <div className="flex items-center gap-6">
                        <Menu />
                    </div>

                    {/* LOGO MIDDLE */}
                    <Link href='/'>
                        <div className="text-center">
                            <div className={`${logoFont.className} text-5xl text-white tracking-wide`}>
                                sourelle.
                            </div>
                            <div className="text-poppins font-light text-white uppercase tracking-widest">
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
