import React, { Fragment } from 'react';
import './Contact.scss';
import { NavLink } from 'react-router-dom';

export const Contact = () => {
    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log('Send Message')
    }

    return (
        <section className="contact" id="contact">
            <div className="contact__shell">
                <div className="contact__layer">
                    <div className="contact__title">Contact</div>
                    <div className="contact__main">
                        <nav className="contact__nav">
                            <NavLink to="/whatwedo" className="contact__nav-link">What we do</NavLink>
                            <a href="/#about" className="contact__nav-link">About</a>
                            <a href="/#work" className="contact__nav-link">Work</a>
                            <a href="/#contact" className="contact__nav-link">Contact</a>
                        </nav>
                        <div className="contact__info">
                            <div>
                                <span className="contact__info-value">Louis Normandin</span>
                                <span className="contact__info-caption">Head of Production</span>
                                <span className="contact__info-email">Louis@wildcapture.io</span> 
                            </div>
                            <div>
                                <span className="contact__info-value">Wilfred Driscoll</span>
                                <span className="contact__info-caption">Chief Executive Officer</span>
                                <span className="contact__info-email">wd@wildcapture.io</span> 
                            </div>
                        </div>
                        <form className="contact__form" onSubmit={handleFormSubmit}>
                            <input className="contact__input" type="text" placeholder="Your name" />
                            <input className="contact__input" type="text" placeholder="Your email" />
                            <input className="contact__input" type="text" placeholder="Your company" />
                            <textarea className="contact__textarea" placeholder="How can we help.." />
                            <input type="submit" className="button contact__submit" value="Send" />
                        </form>
                    </div>
                    <footer className="footer">
                        <div className="footer__logo">
                            <img src={"../img/wildcapture-footer-logo.svg"} />
                        </div>
                        <div className="footer__copyright">© 2020 Wild Capture</div>
                    </footer>
                </div>
            </div>
        </section>
    )
}