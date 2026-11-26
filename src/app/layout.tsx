import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import Loader from "@/components/layout/Loader";

// next/font self-hosts these files at build time (no runtime requests to Google).
// "Velvet & Gold": Cormorant for display and accents, Montserrat for text and labels.
const cormorant = Cormorant({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });


const description = `${profile.title} and ${profile.discipline} in ${profile.location}. ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} · ${profile.title}`, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  keywords: ["Frontend Developer", "UI/UX Designer", "Vue.js", "WordPress", "WooCommerce", "Lahore", "Pakistan", "Portfolio"],
  openGraph: {
    type: "website",
    title: `${profile.name} · ${profile.title}`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} · ${profile.title}`, description },
};

export const viewport: Viewport = { themeColor: "#1a1519", colorScheme: "dark" };

// Runs before paint: repeat visits in this session skip the intro loader.
const bootScript = `try{if(sessionStorage.getItem('shd-intro'))document.documentElement.setAttribute('data-visited','')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`.loader{display:none}[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-linen px-5 py-3 text-sm font-medium text-plum-700 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <Loader />
        <SmoothScroll />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
