"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;

        if (name) {
            router.push(`/list?name=${name}`);
        }
    };

    return (
        <form className="flex bg-gray-100 p-1 rounded-full border w-[85%] max-w-lg shadow-sm focus-within:shadow-lg transition-shadow duration-300" onSubmit={handleSearch}>
            <input
                type="text"
                name="name"
                placeholder="Buscar"
                className="flex-1 bg-transparent outline-none px-4 py-2 rounded-full text-lg font-medium placeholder:text-gray-500"
            />
            <button className="cursor-pointer rounded-full bg-gradient-to-r p-2 transition-transform transform hover:scale-110">
                <Image src="/search.png" alt="Search" width={20} height={20} />
            </button>
        </form>
    );
}
