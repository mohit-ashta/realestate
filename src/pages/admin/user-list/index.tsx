
import { useGetUserDelete } from "@/api/mutations/user-delete";
import { useGetUserInfoList } from "@/api/query/get-user-info";


import SmallLoader from "@/components/molecules/loader/loader";
import PageNotFound from "@/components/molecules/page-not-found";
import Layout from "@/components/organisms/layout";
import { log } from "console";

import React, { useState } from "react";
import { BsFillHouseLockFill, BsHouseLock } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { number } from "yup";

const UserInfoList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error, refetch } = useGetUserInfoList(currentPage);
    const { mutate: deleteUser } = useGetUserDelete();
    console.log('currentPage', currentPage);

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
    console.log('resultPerPage', resultPerPage);
    console.log('users.length', users.length);



    const paginatea = (pageNumber: any) => setCurrentPage(pageNumber);
    const paginate = (action: string | number) => {
        if (action === "prev") {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        } else if (action === "next") {
            setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, Math.ceil(data?.userCount / resultPerPage))
            );
        } else {
            setCurrentPage(
                typeof action === "string" ? parseInt(action, 10) : action
            );
        }
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
                            <th className="text-left px-5 py-4 bg-[#313131] w-[10%]">Sr. No.</th>
                            <th className="text-left px-5 py-4 bg-[#313131] w-[25%]">Name</th>
                            <th className="text-left px-5 py-4 bg-[#313131] w-[30%]">Email</th>
                            <th className="text-left px-5 py-4 bg-[#313131] w-[25%]">Role</th>
                            <th className="text-center px-5 py-4 bg-[#313131] w-[10%]">Actions</th>
                        </tr>
                        {users.map((user: any, index: number) => (
                            <tr className="border-b border-b-[#353535] text-admin-color2"
                                key={user.id}>
                                <td className="px-5 py-2">{indexOfFirstUser +index+ 1}</td>
                                <td className="px-5 py-2">{user.name}</td>
                                <td className="px-5 py-2">{user.email}</td>
                                <td className="px-5 py-2">{user.role}</td>
                                <td className="px-5 py-2 flex justify-center">
                                    {user.role === "admin" ? (
                                        <BsHouseLock
                                            size={22}
                                            className="text-admin-color2 cursor-not-allowed"
                                        />
                                    ) : (
                                        <RiDeleteBin6Line
                                            className="cursor-pointer"
                                            size={20}
                                            color="#FF0000"
                                            onClick={() => handleUserDelete(user)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div className="pagination mt-6">
                        <ul className="flex gap-4">
                            <li className="bg-greyish px-3 rounded text-white">
                                <button onClick={() => paginate("prev")}>Previous</button>
                            </li>
                            {Array.from({
                                length: Math.ceil(users.length / resultPerPage),
                            }).map((_, index) => (
                                <li key={index}>
                                    <button onClick={() => paginate(index + 1)} className="text-white">
                                        {currentPage}
                                    </button>
                                </li>
                            ))}
                            <li className="bg-greyish px-3 rounded text-white">
                                <button onClick={() => paginate("next")}>Next</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default UserInfoList;