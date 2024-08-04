import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/pages/Navbar";
import Navbar2 from "@/components/pages/Navbar2";
import { NextProvider } from "@/Providers/NextUIProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  "title": "JobSphere - Search and Discover Your Perfect Job",
  "description": "JobSphere helps you search and discover your perfect job from a wide range of options. Find jobs by industry, location, experience level, and more. Start your career journey with JobSphere today.",
  "keywords": "job search, job finder, careers, employment, job listings, job openings, career opportunities, find jobs, work opportunities",
  "openGraph": {
    "type": "website",
    "url": "https://www.JobSphere.com",
    "title": "JobSphere - Search and Discover Your Perfect Job",
    "description": "JobSphere helps you search and discover your perfect job from a wide range of options. Find jobs by industry, location, experience level, and more. Start your career journey with JobSphere today.",
    images: [
      {
        url: "/images/jobBG2.jpeg",
        width: 800,
        height: 600,
        alt: "JobSphere",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="example">
     <NextProvider>
     <body className={inter.className}>
        <Navbar2/>
        {children}
        <Toaster />
      </body>
     </NextProvider>
    </html>
  );
}
