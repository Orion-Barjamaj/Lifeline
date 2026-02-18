import style from "./page.module.css";
import BottomNav from "./components/bottom-nav";
import Hero from "./sections/hero/hero";
import Product from "./sections/product/product";

export default function Home() {
  return (
    <div className={style.container}>
      <Hero />
      <Product />
      <BottomNav />
      <footer id="footer" className={style.footer}>
        <p>Built for rapid emergency response and field coordination.</p>
      </footer>
    </div>
  );
}
