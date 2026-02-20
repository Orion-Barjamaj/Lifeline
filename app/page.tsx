import style from "./page.module.css";
import BottomNav from "./components/bottom-nav";
import Contact from "./sections/contact/contact";
import Hero from "./sections/hero/hero";
import Missions from "./sections/missions/missions";
import Product from "./sections/product/product";

export default function Home() {
  return (
    <div className={style.container}>
      <Hero />
      <Product />
      <Missions />
      <Contact />
      <BottomNav />
      <footer id="footer" className={style.footer}>
        <p>Built for rapid emergency response and field coordination.</p>
      </footer>
    </div>
  );
}
