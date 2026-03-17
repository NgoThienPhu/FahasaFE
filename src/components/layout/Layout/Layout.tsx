import React from "react";
import styles from "./Layout.module.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import CartOverlayButton from "../../cart_overlay/CartOverlayButton";

export const Layout: React.FC = () => (
  <div className={styles.appLayout}>
    <Header />
    <div className={styles.layoutContent}>
        <Outlet />
    </div>
    <Footer />
    <CartOverlayButton />
  </div>
);