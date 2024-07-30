"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetOwnProfileMutation } from "./authApi";
import { setValue, userLoggedOut } from "./authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [getOwnProfile] = useGetOwnProfileMutation();
  const { replace } = useRouter();
  const path = usePathname();

  useEffect(() => {
    setIsLoading(true);
    getOwnProfile()
      .then(res => {
        setIsLoading(false);
        dispatch(setValue({ target: "user", value: res.data.data }));
        if (path.includes("/admin-login")) replace("/admin/dashboard");
        // replace('/admin/dashboard')
      })
      .catch(_err => {
        setIsLoading(false);
        dispatch(userLoggedOut(undefined));
        replace("/admin-login");
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <>{children}</>;
}
