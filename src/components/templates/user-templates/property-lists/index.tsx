"use client";
import { useGetHomeList } from "@/api/query";
import SmallLoader from "@/components/molecules/loader/loader";
import PageNotFound from "@/components/molecules/page-not-found";
import Layout from "@/components/organisms/layout";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { PiBuildings } from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { SlEye } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export const PropertyListTemplate = () => {
  const { data, isLoading, error, refetch } = useGetHomeList();

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

  const homes = data?.buyHome || []; // Adjust this based on your API response structure

  return (
    <Layout>
      <section className="bg-[url('/image/slide3.avif')] inner_banner py-28 rounded bg-center bg-[#0000002b] bg-blend-multiply">
        <div className="rounded-t-lg flex items-center justify-center">
          <h1 className="text-white font-semibold text-center max-w-[1000px] mx-auto text-[30px] lg:text-[50px] leading-[110%]">
            Explore top-rated real estate listings curated just for you.
          </h1>
        </div>
      </section>
      <section className="bg-white pt-[90px] pb-[50px]">
        <div className="wrapper">
          {homes.length < 1 ? <div className="grid  grid-cols place-items-center items-center text-primary ">
            Sorry ! There is no Property <div className="text-2xl">🥺</div>
          </div> :
            <div className="grid lg:grid-cols-3 grid-cols gap-6" data-aos="fade-up"
            data-aos-anchor-placement="center-center">
              {homes &&
                homes.map((home: any) => (
                  <Link href={`property-list/${home._id}`}
                    key={home._id}>
                    <div
                      className="rounded-lg product_box overflow-hidden z-1"
                    >
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
                                    className="rounded h-[290px] w-full object-cover object-center"
                                    src={`http://localhost:4000/uploads/${image?.filename}`}
                                    alt={image.filename}
                                    width={500}
                                    height={20}
                                  />
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </div>
                        <div className="absolute top-3 right-3 text-primary cursor-pointer">
                          {/* <Link
                        href={`property-list/${home._id}`}
                        className="readMoreBtn"
                      >
                        <SlEye
                          size={40}
                          className="bg-white p-2 rounded-full"
                        />
                      </Link> */}
                        </div>
                        <div>
                          <div className="flex justify-between gap-4 mt-5">
                            <h3 className=" text-black text-2xl font-medium title-font capitalize">
                              {home.name}
                            </h3>
                            <h2 className="text-lg text-primary font-semibold title-font">
                              &#8377; <span>{home.price.toLocaleString()}</span>
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
                                  {home.size} ft<sup>2</sup>
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
          }
        </div>
      </section>
    </Layout>
  );
};
