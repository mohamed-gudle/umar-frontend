"use client"

import { useState, useEffect, useCallback } from "react"

import { useAuthContext } from "../hooks"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

// ----------------------------------------------------------------------

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const pathname = usePathname()

  const searchParams = useSearchParams()
  
  const { authenticated, loading } = useAuthContext()

  const [isChecking, setIsChecking] = useState(true)

  const createQueryString = useCallback(
    (name: string, value: any) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const checkPermissions = async () => {
    if (loading) {
      return
    }

    if (!authenticated) {
      const signInPath = "/auth/sign-in"

      const href = `${signInPath}?${createQueryString("returnTo", pathname)}`

      router.replace(href)
      return
    }

    setIsChecking(false)
  }

  useEffect(() => {
    checkPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading])

  if (isChecking) {
    return <div>loading</div>
  }

  return <>{children}</>
}
