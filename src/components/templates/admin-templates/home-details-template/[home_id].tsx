import { useRouter } from "next/router";
import Layout from "@/components/organisms/layout";
import { useGetSingleList } from "@/api/query/get-single-list";
import { useEffect } from "react";
import Image from "next/image";
import { PiArmchairLight } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuCalendarDays } from "react-icons/lu";
import {
  PiGarageLight,
  PiPaintBrushHouseholdLight,
  PiBathtubLight,
} from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import SmallLoader from "@/components/molecules/loader/loader";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import PageNotFound from "@/components/molecules/page-not-found";
import { Navigation, Pagination } from "swiper/modules";

const SingleHomeListTemplate = () => {
  const router = useRouter();
  const { home_id } = router.query;

  const { isLoading, error, data, refetch } = useGetSingleList(home_id as string)

  useEffect(() => {
    refetch()
  }, [home_id])

  if (isLoading) {
    return (
      <div>
        {" "}
        <SmallLoader />
      </div>
    );
  }
  if (!home_id) {
    // Handle the case where home_id is not defined
    return <div>Invalid home ID</div>;
  }
  if (error) {
    return <div><PageNotFound /></div>;
  }

  const homeDetails = data?.buyHome; // Adjust this based on your API response structure
  console.log("homeDetails", homeDetails);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="wrapper">
          <div>
            <div className="grid lg:grid-cols-2 grid-cols gap-8 items-center">
              <div className="relative">
                <Swiper className="mySwiper z-1 relative swiper2"
                  modules={[Navigation, Pagination]}
                  navigation={true}
                  loop
                  pagination={{ clickable: true }}
                >
                  {homeDetails?.media.map((image: any, idx: number) => {
                    return (
                      <SwiperSlide key={idx}>
                        <Image
                          key={image._id}
                          className="rounded object-cover object-center w-full h-[500px]"
                          src={`http://localhost:4000/uploads/${image?.filename}`}
                          alt={image?.filename}
                          width={500}
                          height={20}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div>
                <div className="flex justify-between items-center gap-4 mb-4">
                  <h3 className="text-admin-color lg:text-3xl title-font font-medium mb-1 capitalize">
                    {homeDetails?.name}
                  </h3>
                  <p className="text-admin-color lg:text-base title-font font-medium min-w-[200px] text-end">
                    &#8377; {homeDetails?.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1 items-center mb-4">
                  <div className="min-w-[20px] text-admin-color2">
                    <CiLocationOn size={20} />
                  </div>
                  <p className="leading-relaxed text-sm capitalize line-clamp-1 text-admin-color2">
                    {homeDetails?.address}
                  </p> 
                </div>
                <p className="leading-relaxed pb-3 text-admin-color2">
                  {homeDetails?.description}
                </p>
                <div className="lg:pb-6 ">
                  <h6 className="text-lg py-5 text-admin-color">Property Features</h6>
                  <div className="grid lg:grid-cols-2 grid-cols lg:gap-5">
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <HiOutlineBuildingOffice2 size="20" />
                        </span>
                        <span className="text-sm">Size </span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.size}  <small className="lowercase">ft<sup>2</sup></small>
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <HiOutlineBuildingOffice2 size="20" />
                        </span>
                        <span className="text-sm">Floor </span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.floor}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <LiaBedSolid size="20" />
                        </span>
                        <span className="text-sm">Bedroom </span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.bedroom}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <PiBathtubLight size="20" />
                        </span>
                        <span className="text-sm">Bathroom </span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.bathrooms}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2 ">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <LuCalendarDays size="18" />
                        </span>
                        <span className="text-sm">Construction Year </span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.constructionYear}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <PiPaintBrushHouseholdLight size="20" />
                        </span>
                        <span className="text-sm">Renovation</span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.renovation}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2 ">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <PiGarageLight size="20" />
                        </span>
                        <span className="text-sm">Garage</span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.garage}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-b-[#313131] pb-3 lg:pt-0 pt-3 text-admin-color2">
                      <div className="flex gap-3">
                        <span className="text-sm">
                          <PiArmchairLight size="20" />
                        </span>
                        <span className="text-sm">Furnishing</span>
                      </div>
                      <span className="text-end text-sm capitalize">
                        {homeDetails?.furnishing}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingleHomeListTemplate;
