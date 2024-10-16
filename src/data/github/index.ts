import axiosInstance, { fetcher } from "@/lib/axios"

import { useMemo } from "react"
import useSWR from "swr"

export function useGetUserToken(code: string | null) {
  const { data, isLoading, error } = useSWR(
    `/github/user-token?code=${code}`,
    fetcher,
  )

  return useMemo(() => {
    return {
      data,
      isLoading,
      error,
    }
  }, [data, isLoading, error])
}

export async function createIssue(
  url: string,
  { arg }: { arg:{repository: string; title: string; body: string} },
) {
  const response = await axiosInstance.post("/github/create-issue", {
    repository: arg.repository,
    title: arg.title,
    body: arg.body,
  })

  return response.data
}
