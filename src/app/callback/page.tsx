"use client"
import { useGetUserToken } from "@/data/github"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const code = useSearchParams().get("code")
  const { data, isLoading, error } = useGetUserToken(code)

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
