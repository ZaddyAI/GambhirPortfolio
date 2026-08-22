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

const baseUrl = 'https://www.gambhirpoudel.com.np'

export const metadata: Metadata = {
  title: 'Gambhir Poudel',
  description: 'Gambhir Poudel - Mobile & Frontend Engineer. Building things for the web & mobile.',
  keywords: ['Gambhir Poudel', 'Software Developer', 'Flutter Developer', 'React Developer', 'Portfolio'],
  authors: [{ name: 'Gambhir Poudel' }],
  icons: {
    icon: '/greenLogo.png',
  },
  openGraph: {
    title: 'Gambhir Poudel',
    description: 'Gambhir Poudel - Mobile & Frontend Engineer. Building things for the web & mobile.',
    type: 'website',
    siteName: 'Gambhir Poudel',
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/greenLogo.png`,
        width: 1200,
        height: 630,
        alt: 'Gambhir Poudel - Mobile & Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gambhir Poudel',
    description: 'Gambhir Poudel - Mobile & Frontend Engineer. Building things for the web & mobile.',
    images: [`${baseUrl}/greenLogo.png`],
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
