import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const Header: React.FC = () => {

  const { user, isAuth, logout } = useAuth();

  return (
    <header>
      <div className={styles.headerLeft}>
        <NavLink to={"/"} className={styles.siteBrand}>Fahasa.<span className={styles.brandSuffix}>com</span></NavLink>
      </div>
      <div className={styles.headerCenter}>
        <div className={styles.navLinks}>
          <NavLink to={"/"} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Trang Chủ</NavLink>
          <NavLink to={"/about"} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Giới Thiệu</NavLink>
          <NavLink to={"/products"} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Sản Phẩm</NavLink>
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.authActions}>
          {(isAuth && user) ? (
            <div className={styles.userGreeting}>
              <NavLink to={"/auth"}>{user.fullName}</NavLink>
              <button className={styles.logoutBtn} onClick={logout}>Đăng Xuất</button>
            </div>
          ) : (
            <NavLink to={"/auth"} className={styles.authLink}>Đăng Nhập / Đăng Ký</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};