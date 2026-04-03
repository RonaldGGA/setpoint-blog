import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import { ApolloWrapper } from "@/lib/ApolloWrapper";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Setpoint",
  description:
    "Technical publishing for the Industry 4.0, SCADA, PLCs, IIoT, Software Development, Arduino and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
