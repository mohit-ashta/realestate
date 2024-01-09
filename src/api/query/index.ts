import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const getHomeList = async (page: any) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/home/list?page=${page}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error) {
      toast.error(error.response.data.message);
    }
  }
};

export const useGetHomeList = (page: any) => {
  return useQuery(["listHomes", page], () => getHomeList(page));
};