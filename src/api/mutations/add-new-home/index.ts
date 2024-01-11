import { ErrorResponse, NewHomeProps } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const uploadMedia = async (addNewHome: NewHomeProps) => {
  const getToken = localStorage.getItem("token");
  try {
    const formData = new FormData();
    
    formData.append("name", addNewHome.name);
    formData.append("description", addNewHome.description);
    formData.append("price", addNewHome.price.toString());
    formData.append("bedroom", addNewHome.bedroom.toString());
    formData.append("bathrooms", addNewHome.bathrooms.toString());
    formData.append("size", addNewHome.size.toString());
    formData.append("floor", addNewHome.floor.toString());
    formData.append("renovation", addNewHome.renovation.toString());
    formData.append("constructionYear", addNewHome.constructionYear.toString());
    formData.append("furnishing", addNewHome.furnishing.toString());
    formData.append("garage", addNewHome.garage.toString());
    formData.append("address", addNewHome.address.toString());
    
    for (let i = 0; i < addNewHome.images.length; i++) {
      formData.append("images", addNewHome.images[i]);
    }
    // url: "http://192.168.1.52:5050/api/login",
    // 192.168.1.52:5050
    // 192.168.1.255
    const reqOptions = {
      method: "POST",
      url: `http://localhost:4000/api/v1/createhome`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken}`,
      },
      data: formData,
    };
    const { data } = await axios(reqOptions);
    toast.success(data.message);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    toast.error(axiosError?.response?.data?.message as string);
    throw axiosError;
  }
};

export const useAddNewProfileHome = () => {
  return useMutation((addNewHome: NewHomeProps) => uploadMedia(addNewHome));
};
