import type { Metadata } from "next"

import { MapPin } from "lucide-react"
import Link from "next/link"

import "./globals.css"

export const metadata: Metadata = {
  title: "TFS Storefront",
  description: "Browse Toyota inventory with Toyota Financial Services financing built in - Next.js Fundamentals Workshop",
  metadataBase: new URL("https://tfs-storefront-workshop.vercel.app"),
}

function SparkleMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c.6 5.1 3.2 8.9 12 12-8.8 3.1-11.4 6.9-12 12-.6-5.1-3.2-8.9-12-12C8.8 8.9 11.4 5.1 12 0Z" />
    </svg>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen antialiased">
        <div className="relative flex min-h-screen flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full px-4 py-4 sm:px-6 lg:px-8">
            <div className="container mx-auto flex max-w-screen-2xl items-center justify-between gap-4">
              <div className="bg-primary text-primary-foreground flex items-center gap-1 rounded-full p-1.5">
                <Link
                  className="hover:bg-primary-foreground/15 flex items-center gap-2 rounded-full px-4 py-2 transition-colors"
                  href="/"
                >
                  <SparkleMark className="text-brand size-4" />
                  <span className="text-sm font-semibold tracking-tight">TFS Storefront</span>
                </Link>
                <Link
                  className="hover:bg-primary-foreground/15 flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors"
                  href="/products"
                >
                  Vehicles
                </Link>
              </div>
              <div className="bg-card text-card-foreground flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
                <MapPin className="size-4" />
                90210
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t">
            <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-muted-foreground text-center text-sm md:text-left">
                  Built by
                  {" "}
                  <a
                    className="hover:text-foreground font-medium underline underline-offset-4"
                    href="https://vercel.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Vercel
                  </a>
                  {" "}
                  for Toyota Financial Services.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
