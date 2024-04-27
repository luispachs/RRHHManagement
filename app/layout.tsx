import type { Metadata,Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



export const viewport:Viewport ={
  themeColor:[
    {media:'(prefers-color-scheme:light)',color:"#B0D9B2"},
    {media:'(prefers-color-scheme:dark)',color:"#011526"}
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
