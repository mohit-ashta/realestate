import { useUser } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";


interface Props {
  allowedRoles: string;
  path: string;
}


export const useAuth = ({ allowedRoles, path }: Props) => {
  const router = useRouter();
  const { user, loading } = useUser();
// console.log("your role is ", user?.role,);

  useEffect(() => {
    if (loading) return;
    if (typeof user?.role === "string" && allowedRoles.includes(user?.role)) {
      router.push(path);
    } else {
      router.push("/");
    }
  }, [loading]);
};
