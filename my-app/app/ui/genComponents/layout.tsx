import Footer from "./footer";
import Header from "./header";  

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <Header />
  <main style={{ flex: 1, minHeight: 0 }}>{children}</main>
      <Footer />
    </div>
  );
}