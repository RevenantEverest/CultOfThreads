import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import "@repo/ui/styles.css";

import React, { Suspense } from 'react';

import { AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import { Sparkle } from '@@shop/components/Common';

import Navbar from '@@shop/navigation/Navbar';
import Footer from '@@shop/navigation/Footer';

import ThemeHandler from '@@shop/components/ThemeHandler';
import Providers from '@@shop/Providers';
import UtmParser from '@@shop/components/UtmParser';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cult of Threads",
    description: "Discover unique handmade crochet goods and creepy plush horror characters. Explore our collection for spooky décor, and one-of-a-kind creations",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                <div className="min-h-[100vh] text-text bg-background overflow-x-hidden">
                    <Suspense>
                        <UtmParser />
                    </Suspense>
                    <ThemeHandler />
                    <UtmParser />
                    <Navbar />
                    <div className="w-[100dvw] h-[100dvh] fixed">
                        <Sparkle
                            count={100}
                            minSize={5}
                            maxSize={15}
                            fadeOutSpeed={2}
                        />
                    </div>
                    <AnimatePresence mode="popLayout">
                        {/* <AnimatedOutlet key={nextMatch ? nextMatch.id : ""} /> */}
                        {children}
                    </AnimatePresence>
                    <Footer />

                    <Toaster 
                        position="top-center"
                        toastOptions={{
                            style: {
                                border: "none",
                                background: "transparent",
                                boxShadow: "none",
                                maxWidth: "98%"
                            }
                        }}    
                    />
                </div>
                </Providers>
            </body>
        </html>
    );
};
