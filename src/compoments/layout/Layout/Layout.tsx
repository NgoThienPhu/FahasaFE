import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout: React.FC<{children?: React.ReactNode}> = ({ children }) => (
  <div className="app-layout">
    <Header />
    <div className="layout-content">
        {children}
    </div>
    <Footer />
  </div>
);