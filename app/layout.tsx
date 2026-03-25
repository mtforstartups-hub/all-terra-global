import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { AuthModalProvider } from "@/context/AuthModalContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  title: "All Terra Global",
  description: "Structured Private Credit Financing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${ibmPlexSans.variable} antialiased`}
      >
        <AuthModalProvider>{children}</AuthModalProvider>
      </body>
    </html>
  );
}
