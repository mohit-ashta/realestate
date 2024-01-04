import { UserRoutes } from "@/constants/routes";
import { useEffect, useState } from "react";
import { ContactMenuList, FooterCategoriesList, HeaderMenuList, HeaderMenuListUser, SocialMenuList } from "@/constants/data";
import { FooterMenuItem, SocialIcons } from "@/components/atoms/menu-item";
import { FooterHeading } from "@/components/atoms/footer-heading";
import { Logo } from "@/components/atoms/logo";

const Footer = () => {
  const [token, setToken] = useState("");
  const NewDate = new Date().getFullYear();

  useEffect(() => {
    const tokenExist = localStorage.getItem("token");
    if (tokenExist) {
      setToken(tokenExist);
    }
  }, [])

  const FooterMenus = () => {
    return (
      token ? HeaderMenuListUser : HeaderMenuList
    )
  }
  return (
    <div className="container">
      <footer className="bg-[#f3f3f3]">
        <div className="lg:flex items-start py-[95px] px-[33px] lg:py-[65px] lg:px-[70px] gap-12">
          <div className="lg:w-[28%] w-full lg:mb-0 mb-10">
            <Logo width={250} height={47} />
            <p className="text-greyish text-[15px] font-normal mt-6 mb-8">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. It is a
              long established fact that a reader will be distracted.
            </p>
            <a className="text-black text-[16px] font-medium" href={UserRoutes.ABOUT.absolutePath}>Read More</a>
          </div>
          <div className="flex justify-between lg:w-full flex-wrap gap-3 md:gap-12">
            <div className="lg:w-[24%]">
              <FooterHeading title="Categories" />
              <ul className="flex flex-col gap-4">
                {FooterCategoriesList.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <FooterMenuItem key={idx} title={item.title} link={item.link} />
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="lg:w-[24%]">
              <FooterHeading title="Navigate" />
              <ul className="flex flex-col gap-4">
                {FooterMenus().map((item, idx) => {
                  return (
                    <li key={idx}>
                      <FooterMenuItem key={idx} title={item.title} link={item.link} />
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="lg:w-[24%]">
              <FooterHeading title="Contact us" />
              <ul className="flex flex-col gap-5">
                {ContactMenuList.map((item, idx) => {
                  return  (
                    <li key={idx}>
                      <FooterMenuItem key={idx} title={item.title} link={item.link} icon={item.icon} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="px-[70px] border-t border-t-[#e8e8e8] lg:py-[18px] pb-[48px]">
          <div className="container mx-auto py-4 flex flex-wrap flex-col sm:flex-row justify-between gap-4">
            <p className="text-greyish text-sm text-center sm:text-left">
              © {NewDate} DreamLand Mark. All Rights Reserved.
            </p>
            <ul className="flex gap-5 justify-around lg:justify-start">
              {SocialMenuList.map((item, idx) => {
                return  (
                  <li key={idx}>
                    <SocialIcons link={item.link} icon={item.icon} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
