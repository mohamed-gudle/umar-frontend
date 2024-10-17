import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/auth/context/auth0"
import { AuthGuard } from "@/auth/guard/auth-guard"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

import { siteConfig } from "./siteConfig"

export const metadata: Metadata = {
  metadataBase: new URL("https://umar.com"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "mgudle",
      url: "",
    },
  ],
  creator: "mgudle",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <AuthGuard>


            <ThemeProvider defaultTheme="light" attribute="class">
              {children}
            </ThemeProvider>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
