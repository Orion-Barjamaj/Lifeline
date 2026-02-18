import style from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={style.container}>
      <Link href="/" className={style.title}>
        LIFELINE
      </Link>
      <div className={style.actions}>
        <a href="#product" className={style.secondaryBtn}>
          Explore Product
        </a>
        <Link href="/sos" className={style.primaryBtn}>
          Look for SOS
        </Link>
      </div>
    </header>
  );
}
