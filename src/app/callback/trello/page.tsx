"use client"
import { useGetUserAccessToken } from "@/data/trello"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const oauthToken = useSearchParams().get("oauth_token")
  const oauthVerifier = useSearchParams().get("oauth_verifier")

  const { data, isLoading, error } = useGetUserAccessToken(oauthToken, oauthVerifier);

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  if (error) {
    return <div>error</div>
  }

  if (isLoading) {
    return <div>loading</div>
  }
  return <div>callback</div>
}
