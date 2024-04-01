import { ErrorResponse, LoginFormProps } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AdminRoutes, UserRoutes } from "@/constants/routes"; // Import your route constants
import { useRouter } from "next/router";

const loginUser = async (loginuser: LoginFormProps) => {
  try {
    const response = await axios.post(
      "http://192.168.100.7:4000/api/v1/login",
      loginuser
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    toast.error(axiosError?.response?.data?.message as string);
    throw axiosError;
  }
};

export const useLoginUser = () => {
  const router = useRouter();

  return useMutation(loginUser,  {
    onSuccess: (res) => {
      // console.log("Full Response:", res);
      const { success, user } = res || {};

      if (success && user) {
        // console.log("Data Object:", user);

        const userRole = user?.role;
        const route = userRole === "admin" ? AdminRoutes?.DASHBOARD : UserRoutes?.PROPERTYLIST;

        router.push(route.absolutePath);
      } else {
        const errorMessage = res?.message || "Invalid response structure";
        toast.error(errorMessage);
        console.error(errorMessage);
      }
    },
  });
};