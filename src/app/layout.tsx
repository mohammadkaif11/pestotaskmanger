import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PestoTaskMangement",
  description: "Mange your task with pesto",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      <body className={`font-sans ${inter.variable} bg-gray-300` }>{children}</body>
    </html>
  );
}
