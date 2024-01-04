import { ErrorResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const getUserDelete = async (id: any) => {
  try {
    const getToken = localStorage.getItem("token");
    const reqOptions = {
      method: "DELETE",
      url: `http://localhost:4000/api/v1/admin/user/${id}`,  // Make sure to include the id in the URL
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
    };
    const { data } = await axios(reqOptions);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    toast.error(axiosError?.response?.data?.message as string);
    throw axiosError;
  }
};

export const useGetUserDelete = () => {
  return useMutation((id: any) => getUserDelete(id));
};