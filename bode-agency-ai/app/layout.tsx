import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bode Agency AI",
  description: "Generate AI-powered ads with prompt, image, video, and voice style inputs"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
