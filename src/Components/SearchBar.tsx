"use client";

import { ConsumeProductAPI } from "@/backEndRoutes";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
    const { setSearchResults } = useAppContext();
    // const authToken = Cookies.get("authToken");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchText]);

    useEffect(() => {
        if (debouncedSearchText) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `${ConsumeProductAPI}?search=${debouncedSearchText}`,
                        {
                            method: "GET",
                            // headers: {
                            //     Authorization: `Bearer ${authToken}`,
                            // },
                        }
                    );
                    const data = await response.json();
                    setSearchResults(data.products || []);
                } catch (error) {
                    console.error("Erro ao buscar os produtos:", error);
                    setSearchResults([]);
                }
            };

            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchText, setSearchResults]);

    return (
        <form
            className="flex bg-gray-100 p-1 rounded-full border w-[85%] max-w-lg shadow-sm focus-within:shadow-lg transition-shadow duration-300 mx-auto"
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                type="text"
                placeholder="Buscar"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="flex-1 bg-transparent outline-none px-4 py-2 rounded-full text-lg font-medium placeholder:text-gray-500"
            />
            <button type="submit" className="cursor-pointer rounded-full p-2">
                <Image src="/search.png" alt="Search" width={20} height={20} />
            </button>
        </form>
    );
}
