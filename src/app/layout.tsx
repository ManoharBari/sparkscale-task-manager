import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "./provider/authProvider";

export const metadata: Metadata = {
  title: "Project Manager",
  description:
    "Sparkscale India internal tool for managing projects and assigning tasks to employees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
