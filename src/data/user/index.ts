import axiosInstance, { fetcher } from "@/lib/axios"

import { useMemo } from "react"
import useSWR from "swr"


export function useGetUser() {
  const { data, isLoading, error } = useSWR('/users/self', fetcher)

  return useMemo(() => {
    return {
      user: data,
      isLoading,
      error,
    }
  }, [data, isLoading, error])
}
