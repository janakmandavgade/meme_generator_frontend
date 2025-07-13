import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MEME - Generator",
  description: "Meme Generator Application Using MCP BY Janak Mandavgade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
