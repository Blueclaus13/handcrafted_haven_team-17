import Layout from "./ui/genComponents/layout";
import "./globals.css";
import Providers from "@/app/providers";

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