import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { PreferencesProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trylo — Global eSIM, Internet Anywhere",
  description:
    "Trylo provides eSIMs for 190+ countries. Buy, install, get online instantly. No physical card, no pricey roaming.",
  keywords: ["esim", "trylo", "global esim", "cheap esim", "travel internet"],
  openGraph: {
    title: "Trylo — Global eSIM",
    description: "Internet anywhere, anytime. eSIMs for 190+ countries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=JSON.parse(localStorage.getItem('trylo_prefs_v1')||'{}');var t=p.theme||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');if(p.lang)document.documentElement.lang=p.lang;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <PreferencesProvider>
          <StoreProvider>{children}</StoreProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
