import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gambhir Poudel",
    description: "Gambhir Poudel Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/greenLogo.png" sizes="64x64" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
