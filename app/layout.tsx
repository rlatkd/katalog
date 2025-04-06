import '@/styles/global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { themeEffect } from '@/utils/themeEffect';

export const metadata: Metadata = {
  title: {
    default: 'xops',
    template: 'xops',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',  // 또는 정확한 경로
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

type RootLayoutProps = {
  children: React.ReactNode,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={cx(
        'bg-black text-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect})()`,
          }}
        />
      </head>
      <body className='antialiased max-w-6xl mx-4 lg:mx-auto overflow-y-scroll'>
        {/* 배경 그라데이션 효과 */}
        <div className="fixed inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -z-10"></div>
        
        <main className='flex-auto min-w-0 flex flex-col px-2 md:px-0'>
          <div>
            {children}
          </div>
          <Analytics />
          <SpeedInsights />
       </main>
      </body>
    </html>
  )
}