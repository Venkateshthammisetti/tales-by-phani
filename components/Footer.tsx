import { asset } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.big} src={asset("/img/logo-light.png")} alt="Tales by Phani Productions" loading="lazy" width={1400} height={790} />
      <div className={styles.cols}>
        <span>Wedding, couple and concert photography. Hyderabad, India.</span>
        <a href="#top">Back to top</a>
        <span>© {new Date().getFullYear()} Tales by Phani Productions</span>
      </div>
    </footer>
  );
}
