import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="header">
            <div className="header__shell">
                <div className="header__row">
                    <NavLink to="/" exact className="logo">logo</NavLink>
                    <div className="header__aside">
                        <nav className="header__nav">
                            <NavLink to="/whatwedo" className="nav__nav-link">What we do</NavLink>
                            <a href="#" className="nav__nav-link">About</a>
                            <a href="#" className="nav__nav-link">Work</a>
                            <a href="#" className="nav__nav-link">Contact</a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}