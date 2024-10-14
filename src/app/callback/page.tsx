"use client"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    if (code) {
      console.log(code)
    }
  }, [])
  return <div>callback</div>
}
