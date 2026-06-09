"use client";

import { usePage } from "../context/PageContext";

const TopBar = () => {
    const { label } = usePage();

    return (
        <div className="bg-red-50 p-4 flex items-center">
            <p className="font-semibold text-lg text-black">{label}</p>
        </div>
    )
}

export default TopBar