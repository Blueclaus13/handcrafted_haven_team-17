import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./ui/genComponents/hero";
import RandomProducts from "./ui/home/ProductPreview";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <section>
        <h1>Welcome to My Next.js App</h1>
        <h2>This is a H2 title</h2>
        <h3>This is a H3 title</h3>
        <h4>This is a H3 title</h4>
        <p >
          Get started by editing <code>app/page.tsx</code>
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
       </section>
       <h2>Colors</h2>
       <div id="primary"><p>Lorem ipsum dolor sit amet,</p></div>
       <div id="secundary"><p>2 Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div>
       <div id="ternary"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p></div> */}
      <RandomProducts />
    </main>
  );
}
