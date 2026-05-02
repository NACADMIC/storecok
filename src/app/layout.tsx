import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/layout/site-header";

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  variable: "--font-ibm-plex-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "매장콕 | AI와 실전 운영 관점으로 돕는 매장 성장 파트너",
  description:
    "AI와 홍보·매장 운영 전문가의 실전 관점을 담아 리뷰, 메뉴, 홍보, 매출 고민을 함께 정리하는 매장콕.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${ibmPlexSansKr.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-foreground">
        <div className="surface-grid min-h-screen">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
