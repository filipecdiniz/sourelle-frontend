"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBar() {

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string;

        if (name) {
            router.push(`/list?name=${name}`)
        }
    }

    return (
        <form className="flex gap-4 bg-gray-200 p-2 rounded-lg border w-[85%] " onSubmit={handleSearch}>
            <input type="text" name="name" placeholder="Buscar" className="flex-1 bg-transparent outline-none" />
            <button className="cursor-pointer">
                <Image src='/search.png' alt="" width={20} height={20} ></Image>
            </button>
        </form>
    )
}