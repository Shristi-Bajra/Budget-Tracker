import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Mail } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FundWise",
  description: "Intelligent financial tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/*header*/}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          {/* <footer> */}
          {/* <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              {/* <p>Made by Shristi</p> */}
          {/* </div>
          </footer> */}

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p className="flex items-center justify-center gap-2 text-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <a
                  href="mailto:your-email@example.com"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  shreestybajracharya@gmail.com
                </a>
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
