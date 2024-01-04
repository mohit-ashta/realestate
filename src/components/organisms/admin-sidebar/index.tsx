import { SidebarMenu } from '@/components/atoms/menu-item'
import { SidebarMenuList } from '@/constants/data'
import { UserRoutes } from '@/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { IoHomeOutline } from "react-icons/io5";

export const AdminSidebar = () => {
    const router = useRouter();
    return (
        <div className="bg-secondary w-[300px] text-admin-color2 border-r border-r-[#353535] shadow-[#ffffff] flex flex-col gap-2 justify-between">
            <ul>
                {SidebarMenuList.map((item, idx) => {
                    return (
                        <li key={idx}>
                            <SidebarMenu key={idx} title={item.title} link={item.link} icon={item.icon}  className={`text-admin-color2 hover:bg-[#191919] hover:text-white ${router.pathname == item.link ? "text-white bg-[#191919]" : ""}`} />
                        </li>)
                })}
            </ul>
            <div className="text-admin-color2 border-t border-t-[#353535] hover:bg-[#191919] hover:text-white">
                <Link
                    href={UserRoutes.HOME.absolutePath}
                    className={`text-[16px] leading-[16.42px] font-normal flex gap-2 items-center px-5 py-4 w-full`}
                >
                    <IoHomeOutline size={22} />
                    Go to Home
                </Link>
            </div>
        </div>
    )
}
