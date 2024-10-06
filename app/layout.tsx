import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qpi AI",
  description: "RBAC & Upload POC",
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
