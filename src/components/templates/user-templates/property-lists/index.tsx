"use client";
import { useGetHomeList } from "@/api/query";
import SmallLoader from "@/components/molecules/loader/loader";
import PageNotFound from "@/components/molecules/page-not-found";
import Layout from "@/components/organisms/layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { PiBuildings } from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { formatNumberInLakhsOrCrores } from "@/components/atoms/format-change";

export const PropertyListTemplate = () => {
  const resultPerPropertyPage = 6;
  const [currentPropertyPages, setCurrentPropertyPages] = useState(1);
  const [propertyKeyword, setPropertyKeyword] = useState("");
  const [getValue, setGetValue] = useState("");
  const { data, isLoading, error, refetch } = useGetHomeList(
    currentPropertyPages,
    propertyKeyword
  );
  const handlerInput = (e: any) => {
    setGetValue(e.target.value);
  };
  const handlerProperty = () => {
    setPropertyKeyword(getValue);
  };
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div>
        <SmallLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageNotFound />
      </div>
    );
  }
  // Adjust this based on your API response structure
  const homes = data?.homePerPage || [];

  const totalPages = Math.ceil(data?.homeCount / resultPerPropertyPage);

  const handleNextPage = () => {
    setCurrentPropertyPages((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPropertyPages((prevPage) => prevPage - 1);
  };
  return (
    <Layout>
      <section className="bg-[url('/image/slide3.avif')] inner_banner py-28 rounded bg-center bg-[#0000002b] bg-blend-multiply">
        <div className="rounded-t-lg flex items-center justify-center">
          <h1 className="text-white font-semibold text-center max-w-[1000px] mx-auto text-[30px] lg:text-[50px] leading-[110%]">
            Explore top-rated real estate listings curated just for you.
          </h1>
        </div>
      </section>
      <section className="bg-white  pb-[50px]">
        <div className="wrapper">
          <div className="flex justify-end py-[20px]">
            <span className="border  flex justify-between  max-w-[370px]">
              <input
                className="focus:outline-none px-2 py-1"
                onChange={handlerInput}
                value={getValue}
                placeholder="search by name"
              />
              <IoSearch
                size="22"
                className="self-center text-greyish"
                onClick={handlerProperty}
              />{" "}
            </span>
          </div>
          {homes.length < 1 ? (
            <div className="grid  grid-cols place-items-center items-center text-primary ">
              Sorry ! There is no Property <div className="text-2xl">🥺</div>
            </div>
          ) : (
            <>
              <div
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3  lg:gap-6"
                data-aos="fade-up"
                data-aos-anchor-placement="center-center"
              >
                {homes &&
                  homes.map((home: any) => (
                    <Link href={`property-list/${home._id}`} key={home._id}>
                      <div className="rounded-lg product_box overflow-hidden z-1">
                        <div className="mb-10 relative">
                          <div>
                            <Swiper
                              className="mySwiper z-1 swiper1"
                              modules={[Navigation, Pagination]}
                              navigation
                              loop
                              pagination={{ clickable: true }}
                            >
                              {home?.media.map((image: any, idx: number) => {
                                return (
                                  <SwiperSlide key={idx}>
                                    <Image
                                      key={image._id}
                                      className="rounded lg:h-[290px] h-[490px]  w-full object-cover object-center"
                                      src={`http://192.168.1.37:4000/uploads/${image?.filename}`}
                                      alt={image.filename}
                                      width={500}
                                      height={20}
                                    />
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                          </div>
                          <div>
                            <div className="flex justify-between gap-4 mt-5">
                              <h3 className=" text-black text-2xl font-medium title-font capitalize">
                                {home.name}
                              </h3>
                              <h2 className="text-lg text-primary font-semibold title-font">
                              {formatNumberInLakhsOrCrores(home?.price)}
                              </h2>
                            </div>
                            <p className="leading-relaxed text-md my-3 line-clamp-3 min-h-[78px] text-greyish text-base">
                              {home.description}
                            </p>
                            <div className="border-t border-t-[#dedede] border-b border-b-[#dedede] grid grid-cols-2 gap-4 py-4">
                              {home.address ? (
                                <div className="flex gap-2 items-center">
                                  <div className="min-w-[22px]">
                                    <CiLocationOn size={22} />
                                  </div>
                                  <p className="leading-relaxed text-sm capitalize line-clamp-1">
                                    {home.address}
                                  </p>
                                </div>
                              ) : (
                                <div></div>
                              )}
                              <div className="flex items-center gap-4 justify-end">
                                <div className="flex gap-2 items-center">
                                  <div className="min-w-[22px]">
                                    <PiBuildings size={22} />
                                  </div>
                                  <p className="leading-relaxed text-sm">
                                    {home.size} Sq.ft.
                                  </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <div className="min-w-[22px]">
                                    <LiaBedSolid size={22} />
                                  </div>
                                  <p className="leading-relaxed text-sm">
                                    {home.bedroom}
                                  </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <div className="min-w-[22px]">
                                    <PiBathtubLight size={22} />
                                  </div>
                                  <p className="leading-relaxed text-sm">
                                    {home.bathrooms}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPropertyPages === 1}
                  className={`${
                    currentPropertyPages === 1 &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <MdOutlineNavigateNext
                    size={30}
                    color="black"
                    className="rotate-180"
                  />
                </button>
                <span className="pagination-text text-black">{`Page ${currentPropertyPages} of ${totalPages}`}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPropertyPages === totalPages}
                  className={`${
                    currentPropertyPages === totalPages &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <MdOutlineNavigateNext size={30} color="black" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};
