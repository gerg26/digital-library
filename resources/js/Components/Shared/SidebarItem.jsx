import { Link } from "@inertiajs/react"
import React from "react"
export default function SidebarItem({icon, text, link}) {
    return (
        <div>
            <Link href={link}>
                <div className="flex gap-3 items-center text-[#5B5B5B]">
                    {icon}
                    <p className="text-lg font-semibold">{text}</p>
                </div>
            </Link>
        </div>
    )    
}