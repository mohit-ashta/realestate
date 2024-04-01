import { ErrorResponse, SignUpFormProps } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const AddNewUser = async (addUser: SignUpFormProps) => {

  try {
    const response = await axios.post(
      `http://192.168.100.7:4000/api/v1/register`,
      addUser,
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage = axiosError?.response?.data?.message as string;

    toast.error(errorMessage);

    throw axiosError;
  }
};

export const useAddNewUser = () => {
  return useMutation((addUser: SignUpFormProps) => AddNewUser(addUser));
};
