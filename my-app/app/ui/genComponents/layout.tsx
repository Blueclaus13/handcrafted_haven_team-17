import Header from "./header";  

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Header/>
      <div style={{paddingTop:"80px"}}>
        {children}</div>
    </div>
  );
}