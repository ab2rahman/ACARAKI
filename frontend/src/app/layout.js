import { Be_Vietnam_Pro, Archivo, Inter, Manrope } from "next/font/google";
import "../../public/styles/global.scss";
import Footer from "@/components/Partials/Footer";
import Header from "@/components/Partials/Header";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Festival Jamu Nusantara 2025 - Acaraki Jamu Fashion Designer Competition",
  description: "Festival Jamu Nusantara 2025 - Acaraki Jamu Fashion Designer Competition dan Kreasi Jamu Mixologist. Event budaya tradisional Indonesia di Anjungan Sarinah, Jakarta.",
  keywords: "festival jamu nusantara, acaraki, jamu fashion designer, jamu mixologist, budaya indonesia, tradisional, fashion competition, sarinah",
  authors: [{ name: "Festival Jamu Nusantara" }],
  creator: "Festival Jamu Nusantara",
  publisher: "Festival Jamu Nusantara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://festivaljamunusantara.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Festival Jamu Nusantara 2025",
    description: "Festival Jamu Nusantara 2025 - Acaraki Jamu Fashion Designer Competition dan Kreasi Jamu Mixologist. Event budaya tradisional Indonesia.",
    url: 'https://festivaljamunusantara.com',
    siteName: 'Festival Jamu Nusantara 2025',
    images: [
      {
        url: '/imgs/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Festival Jamu Nusantara 2025 - Acaraki Competition',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Festival Jamu Nusantara 2025',
    description: 'Festival Jamu Nusantara 2025 - Acaraki Jamu Fashion Designer Competition dan Kreasi Jamu Mixologist.',
    images: ['/imgs/og-image.jpg'],
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
  verification: {
    google: '', // Add your Google Search Console verification code
    yandex: '',
    yahoo: '',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T6HHQL5W');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`
          ${beVietnamPro.variable} 
          ${archivo.variable} 
          ${inter.variable} 
          ${manrope.variable} 
          antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T6HHQL5W"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
