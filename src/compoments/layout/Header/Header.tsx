import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => (
  <header>
    <div className={styles.headerLeft}>
      <NavLink to={"/"} className={styles.siteBrand}>Fahasa.<span className={styles.brandSuffix}>com</span></NavLink>
    </div>
    <div className={styles.headerCenter}>
      <div className={styles.navLinks}>
        <NavLink to={"/"} className={styles.navLink}>Trang Chủ</NavLink>
        <NavLink to={"/about"} className={styles.navLink}>Giới Thiệu</NavLink>
        <NavLink to={"/products"} className={styles.navLink}>Sản Phẩm</NavLink>
      </div>
    </div>
    <div className={styles.headerRight}>
      <div className={styles.authActions}>
        <NavLink to={"/auth"} className={styles.authLink}>Đăng Nhập / Đăng Ký</NavLink>
      </div>
    </div>
  </header>
);
