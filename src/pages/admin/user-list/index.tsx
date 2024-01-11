import { useGetUserDelete } from "@/api/mutations/user-delete";
import { useGetUserInfoList } from "@/api/query/get-user-info";
import Tooltip from "@/components/atoms/tooltip";

import SmallLoader from "@/components/molecules/loader/loader";
import PageNotFound from "@/components/molecules/page-not-found";
import Layout from "@/components/organisms/layout";
import { log } from "console";

import React, { useState } from "react";
import { BsFillHouseLockFill, BsHouseLock } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { number } from "yup";

const UserInfoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetUserInfoList(currentPage);
  const { mutate: deleteUser } = useGetUserDelete();
  console.log("currentPage", currentPage);

  const resultPerPage = 5;

  const handleUserDelete = async (user: any) => {
    console.log("Deleting user:", user._id);
    try {
      await deleteUser(user._id, {
        onSuccess: () => {
          refetch();
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
  const users = data?.userPerPage || [];
  console.log(users);
  const indexOfLastUser = currentPage * resultPerPage;
  const indexOfFirstUser = indexOfLastUser - resultPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(data?.userCount / resultPerPage);
  console.log("resultPerPage", resultPerPage);
  console.log("users.length", users.length);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Layout>
      <section>
        <div className="wrapper">
          <div className="flex gap-4 items-center justify-between mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-admin-color">
              User List
            </h1>
          </div>
          <table className="table-fixed w-full text-white home-lists border border-[#353535]">
            <tr className="border-b border-b-[#353535] text-admin-color2">
              <th className="text-left px-5 py-4 bg-[#313131] w-[10%]">
                Sr. No.
              </th>
              <th className="text-left px-5 py-4 bg-[#313131] w-[25%]">Name</th>
              <th className="text-left px-5 py-4 bg-[#313131] w-[30%]">
                Email
              </th>
              <th className="text-left px-5 py-4 bg-[#313131] w-[25%]">Role</th>
              <th className="text-center px-5 py-4 bg-[#313131] w-[10%]">
                Actions
              </th>
            </tr>
            {users.map((user: any, index: number) => (
              <tr
                className="border-b border-b-[#353535] text-admin-color2"
                key={user.id}
              >
                <td className="px-5 py-2">{indexOfFirstUser + index + 1}</td>
                <td className="px-5 py-2">{user.name}</td>
                <td className="px-5 py-2">{user.email}</td>
                <td className="px-5 py-2">{user.role}</td>
                <td className="px-5 py-2 flex justify-center">
                  {user.role === "admin" ? (
                      <Tooltip text="Not Allowed">
                    <BsHouseLock
                      size={22}
                      className="text-admin-color2 cursor-not-allowed"
                    />
                    </Tooltip>
                  ) : (
                   
                       <Tooltip text="Delete">
                    <RiDeleteBin6Line
                      className="cursor-pointer"
                      size={20}
                      color="#FF0000"
                      onClick={() => handleUserDelete(user)}
                    />
                    </Tooltip>
                    
                  )}
                </td>
              </tr>
            ))}
          </table>

          <div className="flex items-center justify-end mt-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              <MdOutlineNavigateNext
                size={30}
                color="white"
                className="rotate-180"
              />
            </button>
            <span className="pagination-text text-white">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              <MdOutlineNavigateNext size={30} color="white" />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserInfoList;
