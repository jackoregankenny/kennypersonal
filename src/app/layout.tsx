import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Name',
  description: 'Your personal site description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-primary`}>
        <div className="flex flex-col min-h-screen">
          <header className="border-b border-gray-200">
            <nav className="container mx-auto px-6 py-4">
              <ul className="flex space-x-6">
                <li><Link href="/" className="text-primary hover:text-accent">Home</Link></li>
                <li><Link href="/blog" className="text-primary hover:text-accent">Blog</Link></li>
                <li><Link href="/about" className="text-primary hover:text-accent">About</Link></li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
            {children}
          </main>
          <footer className="border-t border-gray-200">
            <div className="container mx-auto px-6 py-4 text-center text-secondary">
              © {new Date().getFullYear()} Your Name
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}