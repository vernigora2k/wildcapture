import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss'

export const Header = () => {
    console.log(window.location.href.includes('whatwedo'))
    const [whatWeDoPage, setWhatWeDoPage] = useState(window.location.href.includes('whatwedo'))

    // useEffect(() => {

    //     setWhatWeDoPage(!whatWeDoPage)
        
    // }, window.location.href.includes('whatwedo'))

    return (
        <header className="header">
            <div className="header__shell">
                <div className="header__row">
                    <NavLink to="/" exact className="header__logo" id="header__logo">
                        {/* <img src={"../img/wildcapture-logo.svg"} className={whatWeDoPage ? 'left-shift' : ''} /> */}
                        <img src={"../img/wildcapture-logo.svg"} />
                    </NavLink>
                    <div className="header__aside">
                        <nav className="header__nav">
                            <NavLink to="/whatwedo" className="nav__nav-link">What we do</NavLink>
                            <a href="/#about" className="nav__nav-link">About</a>
                            <a href="/#work" className="nav__nav-link">Work</a>
                            <a href="/#contact" className="nav__nav-link">Contact</a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}