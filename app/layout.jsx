import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Turf Pros | Irrigation Systems & Pump Installation',
  description:
    'Professional sprinkler systems, sod roller installation, and irrigation pump services for residential and commercial properties.',
  openGraph: {
    title: 'Turf Pros | Irrigation Systems & Pump Installation',
    description:
      'Expert sprinkler systems, sod installation, and high-performance irrigation pumps.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans">{children}</body>

      {/* Simple Analytics — privacy-first, no cookies */}
      <Script
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
