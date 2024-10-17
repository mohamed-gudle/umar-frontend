"use client"

import { useAuth0, Auth0Provider } from "@auth0/auth0-react"
import { useMemo, useState, useEffect, useCallback } from "react"

import axios from "@/lib/axios"

import { AuthContext } from "../auth-context"

// ----------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { domain, clientId, callbackUrl } = {
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
  }

  const onRedirectCallback = useCallback((appState: any) => {
    window.location.replace(appState?.returnTo || window.location.pathname)
  }, [])

  if (!(domain && clientId && callbackUrl)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: callbackUrl,
        audience:"http://localhost:5000"
       }}
      onRedirectCallback={onRedirectCallback}
    >
      <AuthProviderContainer>{children}</AuthProviderContainer>
    </Auth0Provider>
  )
}

// ----------------------------------------------------------------------

function AuthProviderContainer({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently, logout } =
    useAuth0()

  const [accessToken, setAccessToken] = useState<string>("")

  const getAccessToken = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently()
        console.log('authenticating')

        setAccessToken(token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
      } else {
        setAccessToken("")
        delete axios.defaults.headers.common.Authorization
      }
    } catch (error) {
      console.error(error)
    }
  }, [getAccessTokenSilently, isAuthenticated])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  // ----------------------------------------------------------------------

  const handleLogout = useCallback(
    async (options:any) => {
        logout?.(options);
    },
    [logout]
);

  const checkAuthenticated = isAuthenticated
    ? "authenticated"
    : "unauthenticated"

  const status = isLoading ? "loading" : checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      user: user
        ? {
            ...user,
            id: user?.sub,
            accessToken,
            displayName: user?.name,
            photoURL: user?.picture,
            role: user?.role ?? "admin",
          }
        : null,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      logout: handleLogout,
    }),
    [accessToken, status, user],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}
