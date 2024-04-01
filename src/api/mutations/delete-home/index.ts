import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";


const deleteHome = async (id:any) => {
  const getToken = localStorage.getItem("token");
  try {
    const reqOptions = {
      method: "DELETE", 
      url: `http://192.168.100.7:4000/api/v1/home/list/${id}`, 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
    };
    const { data } = await axios(reqOptions);
    return data;
  } catch (error :any) {
    if (error.response && error.response.status === 404) {
      console.error("Home not found:", error.response.data.message);
    
    } else {
      console.error("Error in deleteHome function:", error.message);
    }
    throw error; 
  }
};

export const useDeleteHome = () => {
  return useMutation((id: any) => deleteHome(id));
};
