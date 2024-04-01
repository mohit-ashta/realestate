import Image from "next/image";
import React from "react";

interface CardBoxProps {
  datauser?: string;
  homeCount?: string;
}

export const CardBox: React.FC<CardBoxProps> = ({ datauser, homeCount }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  items-center gap-6 mb-8 text-admin-color2">
      <div className="bg-[#313131]  items-center rounded-xl flex lg:p-2 xl:p-10 p-5 gap-6 justify-between  h-[150px]">
        <div className="md:max-w-14 max-w-10">
          <Image
            src="/image/home.png"
            alt="building"
            width={70}
            height={70}
            blurDataURL="/image/home.png"
            layout="responsive"
          />
        </div>
        <div>
          <div className="lg:text-3xl text-xl pt-3 text-right">
            {/* {data?.homeCount ? data.homeCount : "0"} */}
            {homeCount}
          </div>
          <div className="lg:text-xl text-md">Available Properties</div>
        </div>
      </div>
      <div className="bg-[#313131]  items-center rounded-xl flex lg:p-2 xl:p-10 p-5 gap-6 justify-between  h-[150px]">
        <div className="md:max-w-14 max-w-10">
          <Image
            src="/image/user.png"
            alt="building"
            width={70}
            height={70}
            blurDataURL="/image/user.png"
            layout="resposive"
          />
        </div>
        <div>
          <div className="lg:text-3xl text-xl pt-3 text-right">
            {/* {dataUser?.userCount ? dataUser?.userCount : "0"}{" "} */}
            {datauser}
          </div>
          <div className="lg:text-xl text-md">Logged In Users</div>
        </div>
      </div>
      <div className="bg-[#313131]  items-center rounded-xl flex lg:p-2 xl:p-10 p-5 gap-6 justify-between  h-[150px]">
        <div className="md:max-w-14 max-w-10">
          <Image
            src="/image/menu.png"
            alt="building"
            width={70}
            height={70}
            blurDataURL="/image/menu.png"
            layout="resposive"
          />
        </div>
        <div>
          <div className="lg:text-3xl text-xl pt-3 text-right">0</div>
          <div className="lg:text-xl text-md">Other Notifications</div>
        </div>
      </div>
    </div>
  );
};
