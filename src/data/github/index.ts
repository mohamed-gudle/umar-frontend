import axiosInstance, { fetcher } from "@/lib/axios";

import { useMemo } from "react";
import useSWR from "swr";



export function useGetUserToken(code: string | null) {

  const { data, isLoading, error } = useSWR(`/github/user-token?code=${code}`,fetcher);


  return useMemo(()=>
  {
    return {
      data, isLoading, error
    }
  }, [data, isLoading, error]
  )
}

