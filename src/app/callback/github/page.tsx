"use client"
import { useGetUserToken } from "@/data/github"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const router = useRouter()
  const code = useSearchParams().get("code")
  const { data, isLoading, error } = useGetUserToken(code)

  useEffect(() => {
    if (data) {
      router.push("/")
      console.log(data)

    }
  }, [data,router])

  if (error) {
    return <div>error</div>
  }

  if (isLoading) {
    return <div>loading</div>
  }
  return <div>callback</div>
}
