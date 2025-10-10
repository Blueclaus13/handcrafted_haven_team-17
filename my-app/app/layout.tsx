import Layout from "./ui/genComponents/layout"; 
import "./globals.css";
import "./globals.css";
import { Quicksand, Nunito } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-fancy",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});
export const metadata = {
  title: "Marketplace",
  description: "Product marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
