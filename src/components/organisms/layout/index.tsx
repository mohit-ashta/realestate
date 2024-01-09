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
    <div className={`${isAdminRoute ? "bg-secondary" : "pb-5 px-5"}`}>
      <Header />
      {isAdminRoute ? (
        <div className="flex h-[calc(100vh-88.88px)]">
          <AdminSidebar />
          <div className="p-10">
            <div className=" h-[calc(100vh-168.88px)] overflow-y-scroll no-scroll">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
      {isAdminRoute ? "" : <Footer />}
    </div>
  );
};

export default Layout;
