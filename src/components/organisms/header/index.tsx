import { UserRoutes } from "@/constants/routes";
import { CommonModal } from "../modal";
import { LoginForm } from "../login-form";
import { FiUser } from "react-icons/fi";
import { SignUpForm } from "../signup-form";
import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useAuth";
import { HeaderMenuTab } from "@/constants/data";
import { HeaderMenuItem } from "@/components/atoms/menu-item";
import { Logo } from "@/components/atoms/logo";
import { Sidebar } from "../admin-sidebar";

const Header = () => {
  const router = useRouter();
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
    <div>
      <header
        className={`body-font shadow-b-xl border-b relative ${
          isAdminRoute
            ? "text-admin-color2 bg-secondary border-b-[#353535]"
            : "text-gray-600 bg-white"
        }`}
      >
        <div className="container flex  flex-wrap py-5    items-center justify-between gap-3 lg:px-0 px-4">
          <Logo width={250} height={33} />   
              <Sidebar/>  
          {isAdminRoute ? (
            ""
          ) : (
            <nav className="lg:flex justify-center flex-wrap items-center text-base lg:gap-8 gap-3 hidden">
              {HeaderMenuTab.find((tab) => tab.role === user?.role)?.tabs.map(
                (item: any, idx: number) => (
                  <HeaderMenuItem
                    key={idx}
                    title={item.title}
                    link={item.link}
                  />
                )
              )}
            </nav>
          )}
          <div className="lg:flex gap-4 items-center hidden">
               {token ? (
              <>
              <button
                onClick={handleLogout}
                className={`text-base uppercase font-medium flex gap-1 items-center ${
                  isAdminRoute ? "text-white" : "text-black"
                }`}
              >
                <span>
                  <IoIosLogOut size={20} />
                </span>
                Logout
              </button>
              </>
            ) : (
              <CommonModal
                buttonText="login"
                buttonIcon={<FiUser color="black" size={18} />}
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
        </div>
      </header>
    </div>
  );
};

export default Header;
