"use client";
// import { isAuthenticated } from "@/Utils/Auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const {data:session}=useSession();
    const auth = session?true:false;


    useEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}