import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => (
  <header>
    <div className="headerLeft">
      <NavLink to={"/"} className="siteBrand">Fahasa.<span className="brandSuffix">com</span></NavLink>
    </div>
    <div className="headerCenter">
      <div className="navLinks">
        <NavLink to={"/"} className="navLink">Trang Chủ</NavLink>
        <NavLink to={"/about"} className="navLink">Giới Thiệu</NavLink>
        <NavLink to={"/products"} className="navLink">Sản Phẩm</NavLink>
      </div>
    </div>
    <div className="headerRight">
      <div className="authActions">
        <NavLink to={"/auth"} className="authLink">Đăng Nhập / Đăng Ký</NavLink>
      </div>
    </div>
  </header>
);
