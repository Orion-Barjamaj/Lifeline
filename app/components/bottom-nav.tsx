"use client";

import { useState } from "react";
import Link from "next/link";
import style from "./bottom-nav.module.css";

export default function BottomNav() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={style.wrapper} aria-label="Quick section navigation">
      <div className={style.container}>
        <a href="#hero" className={style.link}>
          Mission
        </a>
        <a href="#product" className={style.link}>
          Product
        </a>
        <Link href="/sos" className={style.link}>
          SOS
        </Link>
        <a href="#footer" className={style.link}>
          Contact
        </a>
      </div>

      <button
        type="button"
        className={`${style.mobileTrigger} ${open ? style.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open menu"
        aria-expanded={open}
      >
        <span>Menu</span>
        <span className={style.bars} aria-hidden="true">
          <span className={style.line}></span>
          <span className={style.line}></span>
          <span className={style.line}></span>
        </span>
      </button>

      <div className={`${style.mobilePanel} ${open ? style.panelOpen : ""}`}>
        <a href="#hero" className={style.mobileLink} onClick={closeMenu}>
          Mission
        </a>
        <a href="#product" className={style.mobileLink} onClick={closeMenu}>
          Product
        </a>
        <Link href="/sos" className={style.mobileLink} onClick={closeMenu}>
          SOS
        </Link>
        <a href="#footer" className={style.mobileLink} onClick={closeMenu}>
          Contact
        </a>
      </div>
    </nav>
  );
}
