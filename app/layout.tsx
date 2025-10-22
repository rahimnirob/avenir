import type React from "react";
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NavigationProvider } from "@/providers/navigation-provider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "AVENIR - The Future Awaits",
  description: "Request access to the future of innovation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      const url = pathname + (searchParams ? `?${searchParams.toString()}` : "");
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    }
  }, [pathname, searchParams]);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="bg-[#0a0b0c] text-white overflow-x-hidden">
        <NavigationProvider>{children}</NavigationProvider>
      </body>
    </html>
  );
}
