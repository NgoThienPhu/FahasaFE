import React from "react";
import "./Layout.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout: React.FC<{children?: React.ReactNode}> = ({ children }) => (
  <div className="appLayout">
    <Header />
    <div className="layoutContent">
        {children}
    </div>
    <Footer />
  </div>
);