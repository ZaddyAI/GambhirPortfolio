import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gambhir Poudel',
  description: 'Gambhir Poudel - Software Developer Portfolio. Building things for the web & mobile.',
  keywords: ['Gambhir Poudel', 'Software Developer', 'Flutter Developer', 'React Developer', 'Portfolio'],
  authors: [{ name: 'Gambhir Poudel' }],
  icons: {
    icon: '/greenLogo.png',
  },
  openGraph: {
    title: 'Gambhir Poudel',
    description: 'Software Developer Portfolio',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-[#0f172a]`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
