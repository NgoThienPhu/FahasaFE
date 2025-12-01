import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => (
  <footer>
    <div className={styles.footerInner}>
      <div className={styles.footerLeft}>© {new Date().getFullYear()} Fahasa</div>
      <div className={styles.footerCenter}>Kiến Thức - Kinh Nghiệm - Trải Nghiệm</div>
      <div className={styles.footerRight}>Tác giả: Ngô Thiên Phú</div>
    </div>
  </footer>
);