import React from "react";
import "./Footer.css";

export const Footer: React.FC = () => (
  <footer>
    <div className="footerInner">
      <div className="footerLeft">© {new Date().getFullYear()} Fahasa</div>
      <div className="footerCenter">Kiến Thức - Kinh Nghiệm - Trải Nghiệm</div>
      <div className="footerRight">Tác giả: Ngô Thiên Phú</div>
    </div>
  </footer>
);