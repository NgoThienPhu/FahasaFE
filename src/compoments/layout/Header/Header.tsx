import React from "react";
import "./Header.css";

export const Header: React.FC = () => (
  <header className="container">
    <div className="headerLeft">
      <a href="#" className="siteBrand">Fahasa.<span className="brandSuffix">com</span></a>
    </div>
    <div className="headerCenter">
      <div className="navLinks">
        <a href="#" className="navLink">Trang Chủ</a>
        <a href="#" className="navLink">Giới Thiệu</a>
        <a href="#" className="navLink">Sản Phẩm</a>
      </div>
    </div>
    <div className="headerRight">
      <div className="authActions">
        <span className="authLink">Đăng Nhập / Đăng Ký</span>
      </div>
    </div>
  </header>
);
