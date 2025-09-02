import React from 'react'
import './Header.css'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {

    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname == path;
    }

    return (
        <header className="header">
            <div className='header-container'>
                <div className='header-left'>
                    <Link to={"/"} className='header-logo'>
                        <span className='header-logo-text'>Fahasa</span>
                        <span className='header-logo-dot'>.com</span>
                    </Link>
                </div>
                <div className='header-center'>
                    <div className='header-menu'>
                        <ul className='header-menu-list'>
                            <li className='header-menu-item'>
                                <Link to={"/"} className={`header-menu-link ${isActive("/") ? "active" : ""}`}>Trang chủ</Link>
                            </li>
                            <li className='header-menu-item'>
                                <Link to={"/products"} className={`header-menu-link ${isActive("/products") ? "active" : ""}`}>Sản phẩm</Link>
                            </li>
                            <li className='header-menu-item'>
                                <Link to={"/news"} className={`header-menu-link ${isActive("/news") ? "active" : ""}`}>Tin tức</Link>
                            </li>
                            <li className='header-menu-item'>
                                <Link to={"/about"} className={`header-menu-link ${isActive("/about") ? "active" : ""}`}>Giới thiệu</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='header-right'>
                    <div className='cart'>
                        <FaShoppingCart />
                        <span className='cart-count'>0</span>
                    </div>
                    <div className='user'>
                        <FaUser />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header