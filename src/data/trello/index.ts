import axiosInstance from "@/lib/axios"
import useSWR from "swr"
import { useMemo } from "react"
import { fetcher } from "@/lib/axios"

export async function authorize() {
  const response = await axiosInstance.get("/trello/authorize")
  return response.data.data.redirectURL
}

export function useGetUserAccessToken(
    token:string | null,
    token_verifier: string | null
) {
  const { data, isLoading, error } = useSWR(
    `/trello/user-token?oauth_token=${token}&oauth_verifier=${token_verifier}`,
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

export async function createList(
    url: string,
    { arg }: { arg:{board: string; listName: string} }
  ) {
    const response = await axiosInstance.post("/trello/create-list", {
        board: arg.board,
        listName: arg.listName,
    })
  
    return response.data
  }
