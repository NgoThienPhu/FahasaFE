import React from "react";
import "./Layout.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC<{children?: React.ReactNode}> = ({ children }) => (
  <div className="appLayout">
    <Header />
    <div className="layoutContent">
        <Outlet />
    </div>
    <Footer />
  </div>
);