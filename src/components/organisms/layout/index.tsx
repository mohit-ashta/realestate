import React, { ReactNode } from "react";
import Footer from "../footer";
import Header from "../header";
import { AdminSidebar } from "../admin-sidebar";
import { useUser } from "@/hooks/useAuth";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const nonAdminRoutes = ["/", "/user/property-list", "/about"];
  const nonAdminRoutesPattern = /^\/user\/property-list\//;

  const isAdminRoute =
    user?.role === "admin" &&
    !nonAdminRoutes.includes(router.pathname) &&
    !nonAdminRoutesPattern.test(router.pathname);

  return (
    <div className={`${isAdminRoute ? "bg-secondary" : "lg:pb-5 lg:px-5 px-2 pb-2"}`}>
      <Header />
      {isAdminRoute ? (
        <div className="md:flex md:h-[calc(100vh-88.88px)] block">
          <AdminSidebar />
          <div className="lg:p-10 p-4 w-full">
            <div className="h-[calc(100vh-168.88px)] overflow-y-scroll no-scroll">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
      {isAdminRoute ? null : <Footer />}
    </div>
  );
};

export default Layout;
