import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartForm",
  description: "Turn any PDF form into a fillable document.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}