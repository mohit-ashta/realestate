// import axios from "axios";
// import { useMutation, useQueryClient } from "react-query";
// import { toast } from "react-toastify";
// import { UpdateHomeProps } from "../../../types/types";

// const getUpdateHome = async (updateHome: UpdateHomeProps) => {
//   const getToken = localStorage.getItem("token");
//   try {
//     const reqOptions = {
//       method: "PUT", 
//       url: `http://192.168.1.37:4000/api/v1/home/update/${updateHome}`, 
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken}`,
//       },
//     };
//     const { data } = await axios(reqOptions);
//     toast.success(data.message);
//     return data;
//   } catch (error: any) {
//     if (error) {
//       toast.error(error.response.data.message);
//     }
//   }
// };

// export const useUpdateHome = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     (updateHome: UpdateHomeProps) => getUpdateHome(updateHome),
//     {
//       onSuccess: (data) => {
//         if (data.success) {
//           toast.success(data.message);
//           queryClient.invalidateQueries({ queryKey: ["listHomes"] });
//         }
//       },
//     }
//   );
// };


import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { UpdateHomeProps } from "../../../types/types";
import { ErrorResponse } from "@/types/types";

const getUpdateHome = async (updateHome: UpdateHomeProps) => {
  console.log('updateHome api', updateHome);

  const getToken = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("name", updateHome.name);
    formData.append("description", updateHome.description);
    formData.append("price", updateHome.price.toString());
    formData.append("bedroom", updateHome.bedroom.toString());
    formData.append("bathrooms", updateHome.bathrooms.toString());
    formData.append("size", updateHome.size.toString());
    formData.append("floor", updateHome.floor.toString());
    formData.append("renovation", updateHome.renovation.toString());
    formData.append("constructionYear", updateHome.constructionYear.toString());
    formData.append("furnishing", updateHome.furnishing.toString());
    formData.append("garage", updateHome.garage.toString());
    formData.append("address", updateHome.address.toString());

    for (let i = 0; i < updateHome?.images.length; i++) {
      formData.append("images api", updateHome.images[i]);
    }
    console.log('Number of images: >apiiiiiiiiii', updateHome?.images.length);
    console.log('Images: apiiiiiiiiii', updateHome?.images);
    const reqOptions = {
      method: "PUT",
      url: `http://192.168.100.7:4000/api/v1/home/update/${updateHome._id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken}`,
      },
      
      data: formData,
      
    };
    const { data } = await axios(reqOptions);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    toast.error(axiosError?.response?.data?.message as string);
    throw axiosError;
  }
};

export const useUpdateHome = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updateHome: UpdateHomeProps) => getUpdateHome(updateHome),
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["listHomes"] });
        }
      },
    }
  );
};