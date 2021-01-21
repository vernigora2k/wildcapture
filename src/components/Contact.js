import React, { useState } from 'react';
import './Contact.scss';
import { NavLink } from 'react-router-dom';
import emailjs from 'emailjs-com';

export const Contact = () => {
    // const [inputYourCompany, setInputYourCompany] = useState('')
    const [inputYourCompanyFocus, setInputYourCompanyFocus] = useState(false)
    const [inputYourCompanyDirty, setInputYourCompanyDirty] = useState(false)
    const [errorInputYourCompany, setErrorInputYourCompany] = useState(false)

    const focusInputHandle = (e) => {
        switch (e.target.name) {
            case 'company':
                setInputYourCompanyFocus(true)
                break
        }
    }

    const blurInputHandle = (e) => {
        switch (e.target.name) {
            case 'company':
                setInputYourCompanyDirty(true)
                break
        }
    }

    const sendMessage = (e) => {
        e.preventDefault()

        emailjs.sendForm('default_service', 'template_khyazu5', e.target, 'user_OJ3mNGaHIui9Vw3ETVM3w')
            .then((result) => {
                console.log(result.text);
                alert('Message sended')
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()
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
                                <span className="contact__info-value">Wilfred Driscoll</span>
                                <span className="contact__info-caption">Chief Executive Officer</span>
                                <span className="contact__info-email">wd@wildcapture.io</span> 
                            </div>
                            <div>
                                <span className="contact__info-value">Louis Normandin</span>
                                <span className="contact__info-caption">Head of Production</span>
                                <span className="contact__info-email">Louis@wildcapture.io</span> 
                            </div>
                        </div>
                        <form className="contact__form" onSubmit={sendMessage}>
                            <input className="contact__input" required type="text" placeholder="Your name" name="name" />
                            <input className="contact__input" required type="text" placeholder="Your email" name="email" />
                            {inputYourCompanyFocus  && 
                                <label className="label-input label-input-your-company" htmlFor="input-your-company">Your company</label>
                            }
                            <input 
                              id="input-your-company" 
                              onFocus={focusInputHandle} 
                              onBlur={blurInputHandle} 
                              className={inputYourCompanyDirty ? 'contact__input contact__input-visited' : 'contact__input'} 
                              type="text" 
                              placeholder="Your company" 
                              name="company" 
                            />
                            <textarea className="contact__textarea" required placeholder="How can we help.." name="message" />
                            <input type="submit" className="button contact__submit" id="contact__submit" value="Send" />
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