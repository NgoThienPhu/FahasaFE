import React from 'react';
import { Link } from 'react-router-dom';
import {
    MdCategory,
    MdSearch,
    MdNotifications,
    MdShoppingCart,
    MdAccountCircle
} from 'react-icons/md';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <header className="header">
                <div className="header-container">
                    <div className="logo-section">
                        <div className="logo">
                            <Link to="/">
                                <div className="logo-content">
                                    <h1>FAHASA</h1>
                                    <span className="logo-com">.com</span>
                                    <span className="logo-owl">🦉</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="search-section">
                        <div className="category-menu">
                            <button className="category-btn">
                                <span className="category-icon"><MdCategory /></span>
                            </button>
                        </div>
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Tìm kiếm sách, tác giả, nhà xuất bản..."
                            />
                            <button className="search-button">
                                <span className="search-icon"><MdSearch /></span>
                            </button>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="action-btn">
                            <span className="action-icon"><MdNotifications /></span>
                        </button>
                        <button className="action-btn">
                            <span className="action-icon"><MdShoppingCart /></span>
                        </button>
                        <button className="action-btn">
                            <span className="action-icon"><MdAccountCircle /></span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="main">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
