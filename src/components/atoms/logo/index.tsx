import { UserRoutes } from '@/constants/routes'
import { useUser } from '@/hooks/useAuth'
import { LogoProps } from '@/types/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export const Logo: React.FC<LogoProps> = ({ width, height }) => {
    const router = useRouter();
    const { user } = useUser();
    const nonAdminRoutes = ["/", "/user/property-list", "/about"];
    const nonAdminRoutesPattern = /^\/user\/property-list\//;

    const isAdminRoute =
        user?.role === "admin" &&
        !nonAdminRoutes.includes(router.pathname) &&
        !nonAdminRoutesPattern.test(router.pathname);
    return (
        <a
            href={UserRoutes.HOME.absolutePath}
            className="flex lg:order-none title-font font-medium items-center text-gray-900 lg:items-center mb-4 md:mb-0"
        >
            <Image
                src="/svg/headerLogo.svg"
                width={width}
                height={height}
                alt="logo"
                className={`cursor-pointer ${isAdminRoute ? "invert" : ""}`}
                priority
            />
        </a>
    )
}
