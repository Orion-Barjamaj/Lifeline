import Link from "next/link";
import Navbar from "../../components/navbar";
import style from "./hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={style.container}>
      <video className={style.backgroundVideo} autoPlay loop muted playsInline>
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
      <div className={style.overlay}></div>
      <div className={style.navShell}>
        <Navbar />
      </div>

      <div className={style.content}>
        <div className={style.left}>
          <span className={style.eyebrow}>Emergency Intelligence Platform</span>
          <h1 className={style.title}>Every second matters</h1>
          <p className={style.description}>
            Lifeline combines autonomous robotics and live telemetry to
            accelerate rescue decisions in high-risk disaster zones.
          </p>
          <div className={style.actions}>
            <Link href="/sos" className={style.primaryBtn}>
              Look for SOS
            </Link>
            <a href="#product" className={style.secondaryBtn}>
              Explore Product
            </a>
          </div>
        </div>

        <div className={style.right}>
          <div className={style.orbit}></div>
          <div className={style.orbit}></div>
          <div className={style.imagePlaceholder}>
            <span>Image Placeholder</span>
            <p>Add your hero image here later</p>
          </div>
          <div className={style.metric}>
            <span>98%</span>
            <p>Detection confidence in live field tests</p>
          </div>
        </div>
      </div>
    </section>
  );
}
