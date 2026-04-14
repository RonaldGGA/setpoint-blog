import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NetworkBackground from "./components/NetworkBackground";
import HideOnAdmin from "./components/NavbarWrapper";
import { ReadingListProvider } from "./components/ReadingListProvider";
import { ResourceHints } from "./components/ResourceHints";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Setpoint",
  description:
    "Where industrial automation meets modern software. Deep dives on PLCs, SCADA, IIoT, and OPC-UA — written by a developer who builds both.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
        <ResourceHints />
        <NetworkBackground />
        <HideOnAdmin>
          <Navbar />
        </HideOnAdmin>
        <ApolloWrapper>
          <ReadingListProvider>{children}</ReadingListProvider>
        </ApolloWrapper>
        <HideOnAdmin>
          <Footer />
        </HideOnAdmin>
      </body>
    </html>
  );
}
