import React from "react";
import styles from "./Layout.module.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC<{children?: React.ReactNode}> = ({ children }) => (
  <div className={styles.appLayout}>
    <Header />
    <div className={styles.layoutContent}>
        <Outlet />
    </div>
    <Footer />
  </div>
);