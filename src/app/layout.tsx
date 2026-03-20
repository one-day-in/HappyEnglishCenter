import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n/LanguageContext"
import { SmoothScrollPatch } from "@/components/SmoothScrollPatch"
import { PageLoader } from "@/components/PageLoader"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "HappyEnglishCenter",
  description: "Modern English learning platform for kids and teens",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/background.webp`} fetchPriority="high" />
        <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/rating.webp`} />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <LanguageProvider>
          <SmoothScrollPatch />
          <PageLoader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
