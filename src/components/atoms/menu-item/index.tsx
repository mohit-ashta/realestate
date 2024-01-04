import { FooterMenuProps, HeaderMenuProps, SidebarMenuProps, SocialIconsProps } from "@/types/types";
import Link from "next/link";

export const HeaderMenuItem: React.FC<HeaderMenuProps> = ({ link, title }) => {
    return (
        <Link
            href={link}
            className="text-black text-base uppercase font-medium"
        >
            {title}
        </Link>
    )
}

export const FooterMenuItem: React.FC<FooterMenuProps> = ({ link, title, icon }) => {
    return (
        <Link
            href={link}
            className={`text-greyish hover:text-primary text-[14px] leading-[16.42px] font-normal ${icon ? "flex gap-2 items-center" : ""}`}
        >
            {icon && icon}
            {title}
        </Link>
    )
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ link, icon }) => {
    return (
        <Link
            href={link}
            className={`text-greyish hover:text-primary text-[14px] leading-[16.42px] font-normal flex gap-2 items-center`}
        >
            {icon}
        </Link>
    )
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ title, link, icon, className }) => {
    return (
        <Link
            href={link}
            className={`text-[16px] leading-[16.42px] font-normal flex gap-2 items-center px-5 py-4 w-full ${className}`}
        >
            {icon}
            {title}
        </Link>
    )
}
