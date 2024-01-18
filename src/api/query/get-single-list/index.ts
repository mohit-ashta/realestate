import { useMutation, useQuery } from "react-query";
import axios from "axios";

const getSingleList = async (id: any) => {
  // console.log("id", id);

  const getToken = localStorage.getItem("token");
  try {
    const reqOptions = {
      method: "GET",
      url: `http://192.168.1.37:4000/api/v1/home/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
    };
    if (id) {
      const { data } = await axios(reqOptions);
      return data;
    }
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

export const useGetSingleList = (id: string) => {
  return useQuery({ queryFn: () => getSingleList(id) });
};
