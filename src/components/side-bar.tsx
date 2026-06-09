"use client";

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PaymentHistoryIcon, PaymentLinkIcon, SettingsIcon, ArrowLeftIcon, WithdrawIcon } from "./icons"
import { usePage } from "../context/PageContext"
import { useEffect } from "react"

const SideBar = () => {
    const pathname = usePathname();
    const { setLabel } = usePage();


    const menu = [
        {
            label: "Home",
            route: "/",
            icon: <HomeIcon />

        },
        {
            label: "Payment History",
            route: "/payment-history",
            icon: <PaymentHistoryIcon />
        },
        {
            label: "Payment Link",
            route: "/payment-link",
            icon: <PaymentLinkIcon />
        },
        {
            label: "Withdraw",
            route: "/withdraw",
            icon: <WithdrawIcon />
        },
        {
            label: "Settings",
            route: "/settings",
            icon: <SettingsIcon />
        }

    ]

    useEffect(() => {
        // Automatically sync the correct label on initial load or URL change
        const activeItem = menu.find(item =>
            item.route === '/' ? pathname === '/' : pathname.startsWith(item.route)
        );
        if (activeItem) {
            setLabel(activeItem.label === "Home" ? "Dashboard" : activeItem.label);
        }
    }, [pathname, setLabel]);

    return (
        <div className="flex flex-col relative  px-6 py-5">
            <Image
                src="/bepay-logo.svg"
                alt="Logo"
                width={72}
                height={72}
            />

            <div className="absolute bg-[#F0F0F0] rounded-full h-[46px] w-[46px] top-[8rem] -right-6 z-10 shadow-lg flex items-center justify-center cursor-pointer">
                <ArrowLeftIcon className="text-black w-6 h-6" />
            </div>

            <div className="flex flex-col gap-6 mt-[8rem]">
                {
                    menu?.map((item, index) => {
                        const isActive = item.route === '/' ? pathname === '/' : pathname.startsWith(item.route);
                        return (
                            <Link
                                href={item?.route}
                                key={index}
                                onClick={() => setLabel(item.label === "Home" ? "Dashboard" : item.label)}
                                className={`flex items-center gap-3 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                                {item?.icon}
                                <span className="whitespace-nowrap">{item?.label}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SideBar