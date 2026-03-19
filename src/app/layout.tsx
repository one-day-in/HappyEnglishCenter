import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n/LanguageContext"

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
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
