import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth";
import { ToastProvider } from '@/components/providers/toast-provider'
import { ToastNotificationsFromUrl } from '@/components/providers/toast-notifications-from-url'
import { ThemeProvider } from '@/components/providers/theme-provider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextJS Rails Starter",
  description: "A NextJS template that consumes a Rails API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
            <ToastProvider />
            <ToastNotificationsFromUrl />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}