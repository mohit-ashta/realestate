import { HeaderMenuItem, SidebarMenu } from "@/components/atoms/menu-item";
import { HeaderMenuTab, SidebarMenuList } from "@/constants/data";
import { UserRoutes } from "@/constants/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoClose, IoHomeOutline } from "react-icons/io5";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { HiBars3BottomRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";
import { useUser } from "@/hooks/useAuth";
import { CommonModal } from "../modal";
import { FiUser } from "react-icons/fi";
import { LoginForm } from "../login-form";
import { SignUpForm } from "../signup-form";
export const AdminSidebar = () => {
  const router = useRouter();
  return (
    <div className="bg-secondary w-[300px] text-admin-color2 border-r border-r-[#353535] shadow-[#ffffff] lg:flex flex-col gap-2 justify-between hidden">
      <ul>
        {SidebarMenuList.map((item, idx) => {
          return (
            <li key={idx}>
              <SidebarMenu
                key={idx}
                title={item.title}
                link={item.link}
                icon={item.icon}
                className={`text-admin-color2 hover:bg-[#191919] hover:text-white ${
                  router.pathname == item.link ? "text-white bg-[#191919]" : ""
                }`}
              />
            </li>
          );
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
  );
};

export const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [token, setToken] = useState("");
  const { user } = useUser();
  const nonAdminRoutes = ["/", "/user/property-list", "/about"];
  const nonAdminRoutesPattern = /^\/user\/property-list\//;

  const isAdminRoute =
    user?.role === "admin" &&
    !nonAdminRoutes.includes(router.pathname) &&
    !nonAdminRoutesPattern.test(router.pathname);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
 
  };

  const handleShowSignup = () => {
    setShowLogin(false);
    setShowSignup(true);

  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully!");
    if (router.pathname === "/") {
      window.location.reload();
    } else {
      router.push(UserRoutes.HOME.absolutePath);
    }
  };

  useEffect(() => {
    const tokenExist = localStorage.getItem("token");
    if (tokenExist) {
      setToken(tokenExist);
    }
  }, []);

  return (
    <div className="lg:hidden block">
      <button onClick={openSidebar} className="z-50">
        <HiBars3BottomRight size="32" />
      </button>

      <Drawer open={isOpen} direction="left" >
        {isAdminRoute ? (
          <>
            <div className="flex justify-end py-2">
              <button onClick={closeSidebar} className="z-50">
                <IoClose size="32" />
              </button>
            </div>

            <div className="  text-admin-color2 border-r border-r-[#353535] shadow-[#ffffff] flex flex-col justify-between ">
              <ul className="pt-4">
                {SidebarMenuList.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <SidebarMenu
                        key={idx}
                        title={item.title}
                        link={item.link}
                        icon={item.icon}
                        className={`text-admin-color2 hover:bg-[#191919] hover:text-white ${
                          router.pathname == item.link
                            ? "text-white bg-greyish"
                            : ""
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>

              <Link
                href={UserRoutes.HOME.absolutePath}
                className={`text-[16px] leading-[16.42px] font-normal flex gap-2 items-center px-4 py-4 w-full hover:bg-[#191919]${
                  router.pathname == UserRoutes.HOME.absolutePath
                    ? "text-white bg-greyish"
                    : ""
                }`}
              >
                <IoHomeOutline size={22} />
                Go to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-end py-2">
              <button onClick={closeSidebar} className="text-white">
                <IoClose size="32" />
              </button>
            </div>
            <nav className="text-admin-color2 border-r border-r-[#353535] shadow-[#ffffff] flex flex-col justify-between ">
              {HeaderMenuTab.find((tab) => tab.role === user?.role)?.tabs.map(
                (item: any, idx: number) => (
                  <HeaderMenuItem
                    key={idx}
                    
                    title={item.title}
                    link={item.link}
                    className={` hover:bg-[#191919] hover:text-white px-4 py-3 text-admin-color2 ${
                      router.pathname == item.link
                        ? "text-white bg-greyish"
                        : ""
                    }`}
                  />
                )
              )}
            </nav>
          </>
        )}
        <div className="  items-center lg:hidden hover:bg-[#191919] hover:text-white px-4 py-3  ">
          {token ? (
            <>
              <button
                onClick={handleLogout}
                className={`text-base  font-medium  items-center flex gap-2 ${
                  isAdminRoute ? "text-white" : "text-admin-color2"
                }`}
              >
                <span>
                  <IoIosLogOut size={20}  />
                </span>
                Logout
              </button>
            </>
          ) : ( 
            <CommonModal
              buttonText="login"
              className="text-admin-color2  flex gap-2"
              buttonIcon={<FiUser  size={18} />}
            >
              <div>
                {showLogin && (
                  <LoginForm
                    email=""
                    password=""
                    handleLogin={handleShowSignup}
                  />
                )}
                {showSignup && (
                  <SignUpForm
                    email=""
                    name=""
                    password=""
                    handleSignup={handleShowLogin}
                  />
                )}
              </div>
            </CommonModal>
          )}
        </div>
      </Drawer>
    </div>
  );
};
