import { ErrorResponse, LoginFormProps } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AdminRoutes, UserRoutes } from "@/constants/routes"; // Import your route constants
import { useRouter } from "next/router";

const loginUser = async (loginuser: LoginFormProps) => {
  // const getToken = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/login",
      loginuser
      // {
      //   headers: {
      //     Authorization: `Bearer ${getToken}`,
      //   },
      // }
    );
    toast.success(response.data.message);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    toast.error(axiosError?.response?.data?.message as string);
    throw axiosError;
  }
};

export const useLoginUser = () => {
  const router = useRouter();

  return useMutation(loginUser, {
    onSuccess: (res) => {
      console.log("Full Response:", res);
      console.log("Response data:", res?.user.role);
      if (res?.success && res?.user) {
        console.log("Data Object:", res.user);

        const userRole = res?.user?.role;

        if (userRole === "admin") {
          router.push(AdminRoutes?.DASHBOARD.absolutePath);
        } else if (userRole === "user") {
          router.push(UserRoutes?.PROPERTYLIST.absolutePath);
        } else {
          console.error("Unknown user role:", userRole);
        }
      } else {
        // Log an error or handle the case where data or success is missing
        console.error("Invalid response structure:", res);
      }
    },
  });
};
