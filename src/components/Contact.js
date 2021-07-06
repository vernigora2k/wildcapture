import React, { useState } from 'react';
import './Contact.scss';
import { NavLink } from 'react-router-dom';
import emailjs from 'emailjs-com';

export const Contact = () => {
    const [inputYourCompanyFocus, setInputYourCompanyFocus] = useState(false)
    const [inputYourCompanyDirty, setInputYourCompanyDirty] = useState(false)
    const [errorInputYourCompany, setErrorInputYourCompany] = useState(false)

    const [inputEmailFocus, setInputEmailFocus] = useState(false)
    const [inputEmailDirty, setInputEmailDirty] = useState(false)
    const [inputEmail, setInputEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)

    const [inputNameFocus, setInputNameFocus] = useState(false)
    const [inputNameDirty, setInputNameDirty] = useState(false)
    const [errorName, setErrorName] = useState(false)

    const [textareaFocus, setTextareaFocus] = useState(false)
    const [textareaDirty, setTextAreaDirty] = useState(false)
    const [errorTextarea, setErrorTextarea] = useState(false)

    const emailHandler = (e) => {
        setInputEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setErrorEmail(true)
        } else {
            setErrorEmail(false)
        }
    }

    const focusInputHandle = (e) => {
        switch (e.target.name) {
            case 'company':
                setInputYourCompanyFocus(true)
                break
            case 'email':
                setInputEmailFocus(true)
                break
            case 'name':
                setInputNameFocus(true)
                break
            case 'message':
                setTextareaFocus(true)
                break
        }
    }

    const blurInputHandle = (e) => {
        switch (e.target.name) {
            case 'company':
                setInputYourCompanyDirty(true)
                break
            case 'email':
                setInputEmailDirty(true)
                break
            case 'name':
                setInputNameDirty(true)
                break
            case 'message':
                setTextAreaDirty(true)
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
            setInputEmail('')
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
                                <span className="contact__info-caption">Chief Operating Officer</span>
                                <span className="contact__info-email">Louis@wildcapture.io</span> 
                            </div>
                        </div>
                        <form className="contact__form" onSubmit={sendMessage}>
                            {inputNameFocus  && 
                                <label className="label-input label-input-name" htmlFor="input-name">Your name</label>
                            }
                            <input 
                              id="input-name"
                              onFocus={focusInputHandle}
                              onBlur={blurInputHandle}
                              className={inputNameDirty ? 'contact__input contact__input-visited' : 'contact__input'} 
                              required 
                              type="text" 
                              placeholder="Your name" 
                              name="name" 
                            />
                            {(inputEmailFocus && errorEmail)  
                                ? <label className="label-input label-input-email label-error" htmlFor="input-email">Your email/error</label>
                                : (inputEmailFocus && <label className="label-input label-input-email" htmlFor="input-email">Your email</label>)
                            }
                            <input 
                              id="input-email" 
                              onFocus={focusInputHandle}
                              onBlur={blurInputHandle}
                              onChange={emailHandler}
                              className={(inputEmailDirty && errorEmail) ? 'contact__input contact__input-visited input-error-email' : (inputEmailDirty ? 'contact__input contact__input-visited' : 'contact__input')} 
                              required 
                              type="email" 
                              placeholder="Your email" 
                              name="email" 
                              value={inputEmail}
                            />
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
                            {textareaFocus  && 
                                <label className="label-input label-textarea" htmlFor="textarea-message">Your message</label>
                            }
                            <textarea 
                              id="textarea-message" 
                              onFocus={focusInputHandle}
                              onBlur={blurInputHandle}
                              className={textareaDirty ? 'contact__textarea contact__textarea-visited' : 'contact__textarea'} 
                              required 
                              placeholder="How can we help.." 
                              name="message" 
                            />
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