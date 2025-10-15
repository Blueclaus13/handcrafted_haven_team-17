import Layout from "./ui/genComponents/layout";
import "./globals.css";
import "./globals.css";
import Providers from "@/app/providers";

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
      <body>
        {/* Wrap everything in the SessionProvider */}
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}