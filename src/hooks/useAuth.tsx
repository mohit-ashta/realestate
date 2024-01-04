import { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";

import { decodeToken } from "../utils/decodeToken";
import { toast } from "react-toastify";
import { userInfoProps } from "@/types/types";

export const useUser = () => {
  const [user, setUser] = useState<userInfoProps>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(false);

    if (!token) return;
    try {
      const userInfo:
        | (userInfoProps & JwtPayload & (string | JwtPayload | any))
        | null = decodeToken({ token });
      setUser(userInfo);
      setLoading(false);
    } catch (error) {
      toast.error(`JWT Decode ${error}`);
    }
  }, []);

  return { user, loading };
};
