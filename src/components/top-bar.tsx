"use client";

import { useState } from "react";
import { usePage } from "../context/PageContext";
import { SearchBar } from "./search-bar";
import { NotificationIcon, WithdrawIcon } from "./icons";
import { Toggle } from "./toggle";
import { Button } from "./button";

const TopBar = () => {
    const { label } = usePage();
    const [isSandbox, setIsSandbox] = useState(false);

    return (
        <div className="px-8 py-6 bg-black flex items-center justify-between">
            <div className="flex items-center gap-8">
                <p className="font-semibold text-xl text-white">{label}</p>
                <SearchBar
                    placeholder="Search for anything"
                    containerClassName="w-[380px]"
                />
            </div>

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <span className="text-white font-medium text-[17px] tracking-wide">Sandbox</span>
                    <Toggle checked={isSandbox} onChange={setIsSandbox} />
                </div>

                <button className="relative text-gray-300 hover:text-white transition-colors cursor-pointer">
                    <NotificationIcon className="w-8 h-8" hasNotification={true} />
                </button>

                <Button icon={<WithdrawIcon className="w-6 h-6" />}>
                    Withdraw
                </Button>
            </div>
        </div>
    )
}

export default TopBar