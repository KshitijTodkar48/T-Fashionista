import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/context/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T-Fashionista Seller-Dashboard",
  description: "Dashboard for sellers to view and manage their sales on T-Fashionista",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}): JSX.Element {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
