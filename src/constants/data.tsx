import { HiOutlineMapPin } from "react-icons/hi2";
import { AdminRoutes, UserRoutes } from "./routes";
import { MdOutlineCall, MdOutlineEmail } from "react-icons/md";
import { PiWhatsappLogo } from "react-icons/pi";
import { RiTwitterXLine } from "react-icons/ri";
import { SlSocialFacebook } from "react-icons/sl";
import { RxDashboard, RxInstagramLogo } from "react-icons/rx";
import { FaList } from "react-icons/fa";

export const HeaderMenuList = [
    {
        link: UserRoutes.HOME.absolutePath,
        title: "Home",
    },
    {
        link: UserRoutes.ABOUT.absolutePath,
        title: "About Us",
    },
    {
        link: UserRoutes.HOME.absolutePath,
        title: "Contact Us",
    },
]

export const HeaderMenuListUser = [
    {
        link: UserRoutes.HOME.absolutePath,
        title: "Home",
    },
    {
        link: UserRoutes.ABOUT.absolutePath,
        title: "About Us",
    },
    {
        link: UserRoutes.PROPERTYLIST.absolutePath,
        title: "Properties",
    },
    {
        link: UserRoutes.HOME.absolutePath,
        title: "Contact Us",
    },

]

export const HeaderMenuListAdmin = [
    {
        link: UserRoutes.HOME.absolutePath,
        title: "Home",
    },
    {
        link: UserRoutes.ABOUT.absolutePath,
        title: "About Us",
    },
    {
        link: UserRoutes.PROPERTYLIST.absolutePath,
        title: "Properties",
    },
    {
        link: AdminRoutes.DASHBOARD.absolutePath,
        title: "Dashboard",
    },
    {
        link: UserRoutes.HOME.absolutePath,
        title: "Contact Us",
    },
]

export const HeaderMenuTab = [
    {
        role: 'user',
        tabs: HeaderMenuListUser,
    },
    {
        role: "admin",
        tabs: HeaderMenuListAdmin,
    },
    {
        role: undefined,
        tabs: HeaderMenuList,
    }

]

export const FooterCategoriesList = [
    {
        link: UserRoutes.HOME.absolutePath,
        title: "To Sell",
    },
    {
        link: UserRoutes.HOME.absolutePath,
        title: "To Buy",
    },
    {
        link: UserRoutes.HOME.absolutePath,
        title: "To Rent",
    },
]

export const ContactMenuList = [
    {
        link: UserRoutes.HOME.absolutePath,
        icon: <HiOutlineMapPin size={20} />,
        title: "XYZ Street, Mohali",
    },
    {
        link: "tel:7657874858",
        icon: <MdOutlineCall size={20} />,
        title: "+91 76578 74858",
    },
    {
        link: "https://wa.me/9870000005",
        icon: <PiWhatsappLogo size={20} />,
        title: "+91 98700 00005",
    },
    {
        link: "mailto:mohitashta123@gmail.com",
        icon: <MdOutlineEmail size={20} />,
        title: "mohitashta123@gmail.com",
    },
]

export const SocialMenuList = [
    {
        link: "/",
        icon: <RxInstagramLogo size={20} />,
    },
    {
        link: "/",
        icon: <SlSocialFacebook size={20} />,
    },
    {
        link: "/",
        icon: <RiTwitterXLine size={20} />,
    },
]

export const SidebarMenuList = [
    {
        link: AdminRoutes.DASHBOARD.absolutePath,
        title: "Dashboard",
        icon: <RxDashboard size={20} />,
    },
    {
        link: AdminRoutes.USERLIST.absolutePath,
        title: "User List",
        icon: <FaList size={20} />,
    },
]