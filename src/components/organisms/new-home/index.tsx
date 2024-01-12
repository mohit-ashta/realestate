"use client";
import { useDeleteHome } from "@/api/mutations/delete-home";

import SmallLoader from "@/components/molecules/loader/loader";
import PageNotFound from "@/components/molecules/page-not-found";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { useAuth } from "@/utils/useAuth";
import { SYSTEM_ROLES } from "@/constants/common-constants";
import { SlEye } from "react-icons/sl";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { SlCloudUpload } from "react-icons/sl";
import { AdminRoutes } from "@/constants/routes";
import { useRouter } from "next/router";
import { useAddNewProfileHome } from "@/api/mutations/add-new-home";
import { validateSchema } from "@/validation-schema";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { useGetHomeList } from "@/api/query";
import { useGetUserInfoList } from "@/api/query/get-user-info";
import { BsBuildings } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { MdOtherHouses, MdOutlineNavigateNext } from "react-icons/md";
import Image from "next/image";
import Tooltip from "@/components/atoms/tooltip";

export const NewHome = () => {
  useAuth({
    allowedRoles: SYSTEM_ROLES?.ADMIN,
    path: AdminRoutes?.DASHBOARD?.absolutePath,
  });
  const router = useRouter();

  const resultPerHomePage = 6;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "1200px",
      border: "none",
      zIndex: "50",
      padding: "50px",
      background: "rgb(40 40 40)",
    },
  };
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);

  const [show, setShow] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [currentUserPages, setCurrentUserPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");

  const methods = useForm({
    resolver: yupResolver(validateSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = methods;

  // #### all mutate
  const { mutate: addNewProducts, isLoading: Loading } = useAddNewProfileHome();
  const { data, isLoading, error, refetch } = useGetHomeList(
    currentPages,
    searchKeyword
  );
  const { mutate: deleteHome, isLoading: deleteLoading } = useDeleteHome();
  const { data: dataUser, isLoading: userLoading } =
    useGetUserInfoList(currentUserPages,[]);

  // #### all images  handle FileChange
  const handleFileChange = (e: any) => {
    const files = e.target.files;
    setSelectedImageFiles(files);
    const newSelectedImages = [];

    for (let i = 0; i < files.length; i++) {
      newSelectedImages.push(URL.createObjectURL(files[i]));
    }

    setSelectedImages(newSelectedImages);
  };

  // #### search functions
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setSearchKeyword(inputValue);
  };
  //    ######## for deleteHome  #######
  const handleDelete = async (home: any) => {
    console.log("Deleting home:", home._id);
    try {
      deleteHome(home._id, {
        onSuccess() {
          refetch();
        },
      });
    } catch (error) {
      console.error("Error deleting home:", error);
    }
  };

  //    ######## for cancel modal #######
  const handleCancelModal = () => {
    setShow(false);
    reset();
    setSelectedImages([]);
  };

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

  const indexOfLastHome = currentPages * resultPerHomePage;
  const indexOfFirstHome = indexOfLastHome - resultPerHomePage;
  const totalPages = Math.ceil(data?.homeCount / resultPerHomePage);

  const handleNextPage = () => {
    setCurrentPages((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPages((prevPage) => prevPage - 1);
  };

  // #### all Create home
  const onSubmit = async (data: any) => {
    console.log("Data received:", data);
    try {
      const year = new Date(data.constructionYear).getFullYear();

      const homeData = {
        ...data,
        constructionYear: year,
        images: selectedImageFiles,
      };
      console.log("homeData", homeData);

      addNewProducts(homeData);

      setShow(false);
    } catch (error) {
      console.error("Error adding new home:", error);
    }
  };

  const homes = data?.homePerPage || [];

  return (
    // <section className="create-home">
    //   <div className="wrapper">
    //     <div className="flex gap-4 items-center justify-between mb-10">
    //       <h1 className="sm:text-3xl text-2xl font-medium title-font text-admin-color">
    //         Admin Dashboard
    //       </h1>
    //       <Modal
    //         isOpen={show}
    //         style={customStyles}
    //         onRequestClose={handleCancelModal}
    //       >
    //         <button
    //           onClick={handleCancelModal}
    //           className="flex justify-end w-full"
    //         >
    //           <AiOutlineClose size={20} color="#708096" />
    //         </button>
    //         <div className="flex flex-col items-center justify-center rounded">
    //           <div className="text-right w-full"></div>
    //           <div>
    //             <h2 className="text-2xl font-medium mb-6 text-center text-admin-color">
    //               Add Property
    //             </h2>
    //             <FormProvider {...methods}>
    //               <form
    //                 onSubmit={handleSubmit(onSubmit)}
    //                 className="grid lg:grid-cols-2 grid-cols lg:gap-20 gap-5 "
    //               >
    //                 <div>
    //                   <div className="grid grid-cols-3 gap-3">
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Name
    //                       </label>
    //                       <input
    //                         type="text"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter Property Name"
    //                         {...register("name", { required: true })}
    //                       />
    //                       {errors?.name && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.name?.message}
    //                         </p>
    //                       )}
    //                     </div>

    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Price
    //                       </label>
    //                       <input
    //                         type="number"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter Property Price"
    //                         {...register("price", { required: true })}
    //                       />
    //                       {errors?.price && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.price?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Bedroom
    //                       </label>
    //                       <input
    //                         type="number"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter number of bedroom"
    //                         {...register("bedroom", { required: true })}
    //                       />
    //                       {errors?.bedroom && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.bedroom?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Bathrooms
    //                       </label>
    //                       <input
    //                         type="number"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter number of bathrooms"
    //                         {...register("bathrooms", { required: true })}
    //                       />
    //                       {errors?.bathrooms && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.bathrooms?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Size{" "}
    //                         <small>
    //                           (ft<sup>2</sup>)
    //                         </small>
    //                       </label>
    //                       <input
    //                         type="number"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter number of size"
    //                         {...register("size", { required: true })}
    //                       />
    //                       {errors?.size && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.size?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Floor
    //                       </label>
    //                       <input
    //                         type="number"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter number of floor"
    //                         {...register("floor", { required: true })}
    //                       />
    //                       {errors?.floor && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.floor?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Garage
    //                       </label>
    //                       <input
    //                         type="text"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Yes or No"
    //                         {...register("garage", { required: true })}
    //                       />
    //                       {errors?.garage && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.garage?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Renovation
    //                       </label>
    //                       <input
    //                         type="text"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Yes or No"
    //                         {...register("renovation", { required: true })}
    //                       />
    //                       {errors?.renovation && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.renovation?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Furnishing
    //                       </label>
    //                       <input
    //                         type="text"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Yes or No"
    //                         {...register("furnishing", { required: true })}
    //                       />
    //                       {errors?.furnishing && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.furnishing?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Construction Year
    //                       </label>
    //                       <input
    //                         type="date"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter construction Year"
    //                         {...register("constructionYear", {
    //                           required: true,
    //                         })}
    //                       />
    //                       {errors?.constructionYear && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.constructionYear?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block text-admin-color font-medium mb-1">
    //                         Address
    //                       </label>
    //                       <input
    //                         type="text"
    //                         className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
    //                         placeholder="Enter Property Address"
    //                         {...register("address", { required: true })}
    //                       />
    //                       {errors?.address && (
    //                         <p className="text-[red] text-xs mt-1">
    //                           {errors?.address?.message}
    //                         </p>
    //                       )}
    //                     </div>
    //                   </div>
    //                   <div className="mb-4">
    //                     <label className="block text-admin-color font-medium mb-1">
    //                       Description
    //                     </label>
    //                     <textarea
    //                       className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm h-[80px]"
    //                       placeholder="Enter Property Description"
    //                       {...register("description", { required: true })}
    //                     ></textarea>
    //                     {errors?.description && (
    //                       <p className="text-[red] text-xs mt-1">
    //                         {errors?.description?.message}
    //                       </p>
    //                     )}
    //                   </div>
    //                 </div>
    //                 <div>
    //                   <label className="block text-admin-color font-medium mb-1">
    //                     Upload Images
    //                   </label>
    //                   <div className="flex h-80 items-center w-auto bg-[#282828] border-[1.5px] border-admin-color border-dashed rounded-[16px]">
    //                     <div className="box__input w-full text-center">
    //                       <label className="text-center cursor-pointer">
    //                         <input
    //                           type="file"
    //                           className="hidden"
    //                           accept="/*"
    //                           multiple
    //                           onChange={handleFileChange}
    //                         />

    //                         {selectedImages.length > 0 ? (
    //                           <div className="\">
    //                             <div className="flex px-2 flex-wrap gap-3">
    //                               {selectedImages.map((imageUrl, index) => (
    //                                 <Image
    //                                   key={index}
    //                                   src={imageUrl}
    //                                   alt={`Selected ${index + 1}`}
    //                                   width={100}
    //                                   height={100}
    //                                   className="w-16 mb-2 rounded"
    //                                 />
    //                               ))}
    //                             </div>
    //                             <strong className="font-figtree text-base leading-[28.8px] font-normal text-admin-color">
    //                               Please Select another image
    //                               <br />
    //                             </strong>
    //                             <span className="font-figtree text-base leading-[28.8px] font-medium text-admin-color">
    //                               Browse Files
    //                             </span>
    //                           </div>
    //                         ) : (
    //                           <>
    //                             <p className="text-center mb-5 flex items-center justify-center">
    //                               <SlCloudUpload
    //                                 size={80}
    //                                 className="text-admin-color"
    //                               />
    //                             </p>
    //                             <strong className="font-figtree text-base leading-[28.8px] font-normal text-admin-color">
    //                               Drag and drop files here <br />
    //                             </strong>
    //                             <span className="font-figtree text-base leading-[28.8px] font-medium text-admin-color">
    //                               Browse Files
    //                             </span>
    //                           </>
    //                         )}
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="flex items-center lg:justify-end  justify-start">
    //                     <button
    //                       type="submit"
    //                       className="text-admin-color2 text-base font-medium flex gap-1 items-center bg-[#313131] py-3 px-5 rounded focus:outline-none focus:shadow-outline mt-5"
    //                     >
    //                       {isLoading ? <SmallLoader /> : <>Create Home</>}
    //                     </button>
    //                   </div>
    //                 </div>
    //               </form>
    //             </FormProvider>
    //           </div>
    //         </div>
    //       </Modal>
    //       <div className="flex items-center">
    //         <input
    //           type="text"
    //           placeholder="Search by name or email"
    //           value={inputValue}
    //           onChange={handleInputChange}
    //           className="p-2 mr-2 border border-[#353535] focus:outline-none focus:border-[#606060] bg-[#303030] text-white"
    //         />
    //         <button
    //           type="submit"
    //           className="bg-[#313131] px-3 py-2 text-admin-color2"
    //           onClick={handleButtonClick}
    //         >
    //           Search
    //         </button>
            
    //       </div>
    //       <div className="flex gap-4 items-center">
    //         <button
    //           onClick={() => setShow(true)}
    //           className="text-admin-color2 text-base font-medium flex gap-1 items-center bg-[#313131] py-3 px-5 rounded focus:outline-none focus:shadow-outline"
    //         >
    //           Create New Home
    //         </button>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-3 items-center ">
    //       <div className="border bg-[#434343] py-3 m-4 text-white text-center items-center rounded-xl flex justify-around h-40 ">
    //         <div>
    //           <BsBuildings size="42" />
    //         </div>
    //         <div>
    //           <div className="text-xl ">Available Properties</div>{" "}
    //           <div className="text-3xl text-start pt-3">{data.homeCount}</div>
    //         </div>
    //       </div>
    //       <div className="border  bg-[#434343] py-3 m-4 text-white text-center items-center rounded-xl flex justify-around h-40">
    //         <div>
    //           <HiUsers size="42" />
    //         </div>
    //         <div>
    //           <div className="text-xl ">User List</div>{" "}
    //           <div className="text-3xl text-start pt-3">
    //             {userLoading ? (
    //               <span className="text-white">loading....</span>
    //             ) : (
    //               <sub>{dataUser?.userCount}</sub>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="border bg-[#434343] py-3 m-4 text-white text-center  items-center rounded-xl flex justify-around h-40">
    //         <div>
    //           <MdOtherHouses size="42" />
    //         </div>
    //         <div>
    //           <div className="text-xl ">Others</div>{" "}
    //           <div className="text-3xl text-start pt-3">N/A</div>
    //         </div>
    //       </div>
    //     </div>
    //     {homes.length < 1 ? (
    //       <div className="grid  grid-cols place-items-center items-center text-admin-color2 h-52">
    //         There is no Property🥺 , Please Create New Property🏢
    //       </div>
    //     ) : (
    //       <>
    //         <table className="table-fixed w-full text-white home-lists border border-[#353535]">
    //           <tr className="border-b border-b-[#353535] text-admin-color2">
    //             <th className="text-left px-5 py-4 bg-[#313131] w-[10%]">
    //               Sr. No.
    //             </th>
    //             <th className="text-left px-5 py-4 bg-[#313131] w-[40%]">
    //               Name
    //             </th>
    //             <th className="text-left px-5 py-4 bg-[#313131] w-[15%]">
    //               Price
    //             </th>
    //             <th className="text-left px-5 py-4 bg-[#313131] w-[25%]">
    //               Location
    //             </th>
    //             <th className="text-center px-5 py-4 bg-[#313131] w-[10%]">
    //               Actions
    //             </th>
    //           </tr>
    //           {homes &&
    //             homes.length > 0 &&
    //             homes.map((home: any, idx: number) => (
    //               <tr
    //                 className="border-b border-b-[#353535] text-admin-color2"
    //                 key={home._id}
    //               >
    //                 <td className="px-5 py-2">{indexOfFirstHome + idx + 1}</td>
    //                 <td className="px-5 py-2">{home.name}</td>
    //                 <td className="px-5 py-2">
    //                   &#8377; <span>{home.price.toLocaleString()}</span>
    //                 </td>
    //                 <td className="px-5 py-2">{home.address}</td>
    //                 <td className="px-5 py-2">
    //                   <ul className="flex gap-4 justify-center">
    //                     <Tooltip text="Edit">
    //                       <li>
    //                         <RiEditLine
    //                           onClick={() =>
    //                             router.push(
    //                               `/admin/home-details/${home._id}/edit`
    //                             )
    //                           }
    //                           className="cursor-pointer"
    //                           size={20}
    //                           color="#008000"
    //                         />
    //                       </li>
    //                     </Tooltip>
    //                     <Tooltip text="View">
    //                       <li>
    //                         <Link href={`home-details/${home._id}`}>
    //                           <SlEye size={20} />
    //                         </Link>
    //                       </li>
    //                     </Tooltip>
    //                     <Tooltip text="Delete">
    //                       <li>
    //                         <button
    //                           className="cursor-pointer"
    //                           onClick={() => handleDelete(home)}
    //                         >
    //                           <RiDeleteBin6Line size={20} color="#FF0000" />
    //                         </button>
    //                       </li>
    //                     </Tooltip>
    //                   </ul>
    //                 </td>
    //               </tr>
    //             ))}
    //         </table>
    //         <div className="flex items-center justify-end mt-3">
    //           <button
    //             onClick={handlePrevPage}
    //             disabled={currentPages === 1}
    //             className={`${
    //               currentPages === 1 && "opacity-50 cursor-not-allowed"
    //             }`}
    //           >
    //             <MdOutlineNavigateNext
    //               size={30}
    //               color="white"
    //               className="rotate-180"
    //             />
    //           </button>
    //           <span className="pagination-text text-white">{`Page ${currentPages} of ${totalPages}`}</span>
    //           <button
    //             onClick={handleNextPage}
    //             disabled={currentPages === totalPages}
    //             className={`${
    //               currentPages === totalPages && "opacity-50 cursor-not-allowed"
    //             }`}
    //           >
    //             <MdOutlineNavigateNext size={30} color="white" />
    //           </button>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </section>
<section className="create-home">
      <div className="wrappers">
        <div className="flex gap-4 items-center justify-between mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-admin-color">
            Admin Dashboard
          </h1>
          <Modal
            isOpen={show}
            style={customStyles}
            onRequestClose={handleCancelModal}
          >
            <button
              onClick={handleCancelModal}
              className="flex justify-end w-full"
            >
              <AiOutlineClose size={20} color="#708096" />
            </button>
            <div className="flex flex-col items-center justify-center rounded">
              <div className="text-right w-full"></div>
              <div>
                <h2 className="text-2xl font-medium mb-6 text-center text-admin-color">
                  Add Property
                </h2>
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid lg:grid-cols-2 grid-cols lg:gap-20 gap-5 "
                  >
                    <div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter Property Name"
                            {...register("name", { required: true })}
                          />
                          {errors?.name && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.name?.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Price
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter Property Price"
                            {...register("price", { required: true })}
                          />
                          {errors?.price && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.price?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Bedroom
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter number of bedroom"
                            {...register("bedroom", { required: true })}
                          />
                          {errors?.bedroom && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.bedroom?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Bathrooms
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter number of bathrooms"
                            {...register("bathrooms", { required: true })}
                          />
                          {errors?.bathrooms && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.bathrooms?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Size
                            <small>
                              (ft<sup>2</sup>)
                            </small>
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter number of size"
                            {...register("size", { required: true })}
                          />
                          {errors?.size && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.size?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Floor
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter number of floor"
                            {...register("floor", { required: true })}
                          />
                          {errors?.floor && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.floor?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Garage
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Yes or No"
                            {...register("garage", { required: true })}
                          />
                          {errors?.garage && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.garage?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Renovation
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Yes or No"
                            {...register("renovation", { required: true })}
                          />
                          {errors?.renovation && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.renovation?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Furnishing
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Yes or No"
                            {...register("furnishing", { required: true })}
                          />
                          {errors?.furnishing && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.furnishing?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Construction Year
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter construction Year"
                            {...register("constructionYear", {
                              required: true,
                            })}
                          />
                          {errors?.constructionYear && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.constructionYear?.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-admin-color font-medium mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm"
                            placeholder="Enter Property Address"
                            {...register("address", { required: true })}
                          />
                          {errors?.address && (
                            <p className="text-[red] text-xs mt-1">
                              {errors?.address?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-admin-color font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color text-sm h-[80px]"
                          placeholder="Enter Property Description"
                          {...register("description", { required: true })}
                        ></textarea>
                        {errors?.description && (
                          <p className="text-[red] text-xs mt-1">
                            {errors?.description?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-admin-color font-medium mb-1">
                        Upload Images
                      </label>
                      <div className="flex h-80 items-center w-auto bg-[#282828] border-[1.5px] border-admin-color border-dashed rounded-[16px]">
                        <div className="box__input w-full text-center">
                          <label className="text-center cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              accept="/*"
                              multiple
                              onChange={handleFileChange}
                            />

                            {selectedImages.length > 0 ? (
                              <div className="\">
                                <div className="flex px-2 flex-wrap gap-3">
                                  {selectedImages.map((imageUrl, index) => (
                                    <Image
                                      key={index}
                                      src={imageUrl}
                                      alt={`Selected ${index + 1}`}
                                      width={100}
                                      height={100}
                                      className="w-16 mb-2 rounded"
                                    />
                                  ))}
                                </div>
                                <strong className="font-figtree text-base leading-[28.8px] font-normal text-admin-color">
                                  Please Select another image
                                  <br />
                                </strong>
                                <span className="font-figtree text-base leading-[28.8px] font-medium text-admin-color">
                                  Browse Files
                                </span>
                              </div>
                            ) : (
                              <>
                                <p className="text-center mb-5 flex items-center justify-center">
                                  <SlCloudUpload
                                    size={80}
                                    className="text-admin-color"
                                  />
                                </p>
                                <strong className="font-figtree text-base leading-[28.8px] font-normal text-admin-color">
                                  Drag and drop files here <br />
                                </strong>
                                <span className="font-figtree text-base leading-[28.8px] font-medium text-admin-color">
                                  Browse Files
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center lg:justify-end  justify-start">
                        <button
                          type="submit"
                          className="text-admin-color2 text-base font-medium flex gap-1 items-center bg-[#313131] py-3 px-5 rounded focus:outline-none focus:shadow-outline mt-5"
                        >
                          {isLoading ? <SmallLoader /> : <>Create Home</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </Modal>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by name or email"
              value={inputValue}
              onChange={handleInputChange}
              className="p-2 mr-2 border border-[#353535] focus:outline-none focus:border-[#606060] bg-[#303030] text-white"
            />
            <button
              type="submit"
              className="bg-[#313131] px-3 py-2 text-admin-color2"
              onClick={handleButtonClick}
            >
              Search
            </button>
            </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShow(true)}
              className="text-admin-color2 text-base font-medium flex gap-1 items-center bg-[#313131] py-3 px-5 rounded focus:outline-none focus:shadow-outline"
            >
              Create New Home
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-6 mb-8 text-admin-color2">
          <div className="bg-[#313131]  items-center rounded-xl flex p-10 gap-6 justify-between">
            <div>
              <Image src="/image/home.png" alt="building" width={70} height={70} />
            </div>
            <div>
              <div className="text-3xl pt-3 text-right">{data.homeCount ? data.homeCount : "0"}</div>
              <div className="text-xl">Available Properties</div>
            </div>
          </div>
          <div className="bg-[#313131]  items-center rounded-xl flex p-10 gap-6 justify-between">
            <div>
              <Image src="/image/user.png" alt="building" width={70} height={70} />
            </div>
            <div>
              <div className="text-3xl pt-3 text-right">{dataUser?.userCount ? dataUser?.userCount : "0"} </div>
              <div className="text-xl">Logged In Users</div>
            </div>
          </div>
          <div className="bg-[#313131]  items-center rounded-xl flex p-10 gap-6 justify-between">
            <div>
              <Image src="/image/menu.png" alt="building" width={70} height={70} />
            </div>
            <div>
              <div className="text-3xl pt-3 text-right">0</div>
              <div className="text-xl">Other Notifications</div>
            </div>
          </div>
        </div>
        {homes.length < 1 ? (
          <div className="grid  grid-cols place-items-center items-center text-admin-color2 h-52">
            There is no Property🥺 , Please Create New Property🏢
          </div>
        ) : (
          <>
            <table className="table-fixed w-full text-white home-lists border border-[#353535]">
              <tr className="border-b border-b-[#353535] text-admin-color2">
                <th className="text-left px-5 py-4 bg-[#313131] w-[10%]">
                  Sr. No.
                </th>
                <th className="text-left px-5 py-4 bg-[#313131] w-[40%]">
                  Name
                </th>
                <th className="text-left px-5 py-4 bg-[#313131] w-[15%]">
                  Price
                </th>
                <th className="text-left px-5 py-4 bg-[#313131] w-[25%]">
                  Location
                </th>
                <th className="text-center px-5 py-4 bg-[#313131] w-[10%]">
                  Actions
                </th>
              </tr>
              {homes &&
                homes.map((home: any, idx: number) => (
                  <tr
                    className="border-b border-b-[#353535] text-admin-color2"
                    key={home._id}
                  >
                  <td className="px-5 py-2">{indexOfFirstHome + idx + 1}</td>
                    <td className="px-5 py-2">{home.name}</td>
                    <td className="px-5 py-2">
                      &#8377; <span>{home.price.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-2">{home.address}</td>
                    <td className="px-5 py-2">
                      <ul className="flex gap-4 justify-center">
                        <li>
                          <RiEditLine
                            onClick={() =>
                              router.push(
                                `/admin/home-details/${home._id}/edit`
                              )
                            }
                            className="cursor-pointer"
                            size={20}
                            color="#008000"
                          />
                        </li>
                        <li>
                          <Link href={`home-details/${home._id}`}>
                            <SlEye size={20} />
                          </Link>
                        </li>
                        <li>
                          <button
                            className="cursor-pointer"
                            onClick={() => handleDelete(home)}
                          >
                            <RiDeleteBin6Line size={20} color="#FF0000" />
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
            </table>

            <div className="flex items-center justify-end mt-3">
              <button
                onClick={handlePrevPage}
                disabled={currentPages === 1}
                className={`${
                  currentPages === 1 && "opacity-50 cursor-not-allowed"
                }`}
              >
                <MdOutlineNavigateNext
                  size={30}
                  color="white"
                  className="rotate-180"
                />
              </button>
              <span className="pagination-text text-white">{`Page ${currentPages} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPages === totalPages}
                className={`${
                  currentPages === totalPages && "opacity-50 cursor-not-allowed"
                }`}
              >
                <MdOutlineNavigateNext size={30} color="white" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
 {
  
 }