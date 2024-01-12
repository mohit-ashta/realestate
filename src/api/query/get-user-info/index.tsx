import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const getUserInfoList = async (page: any,keyword:any) => {
  const getToken = localStorage.getItem("token");
  try {
    const reqOptions = {
      method: "GET",
      url: `http://localhost:4000/api/v1/admin/users-list?page=${page}&keyword=${keyword}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
    };
    const { data } = await axios(reqOptions);
    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Check if the 'message' property exists before logging it
      const errorMessage = error.response.data
        ? error.response.data.message
        : "Home not found";
      console.error("Home not found:", errorMessage);
    } else {
      console.error("Error in getSingleList function:", error.message);
    }
    throw error;
  }
};

export const useGetUserInfoList = (page: any,keyword:any) => {
  return useQuery([page,keyword], () => getUserInfoList(page,keyword));
}; 

