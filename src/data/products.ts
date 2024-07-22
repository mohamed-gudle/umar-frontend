import { fetcher } from "@/lib/axios"
import { useMemo } from "react"
import useSWR from "swr"

export function useGetProducts() {
  const { data, isLoading, error } = useSWR("/api/products", fetcher)

  return useMemo(() => {
    return {
      data,
      isLoading,
      error,
    }
  }, [data, isLoading, error])
}
