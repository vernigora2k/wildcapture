import React, { Fragment } from 'react'
import { Contact } from '../components/Contact'
import { Expertise } from '../components/Expertise'
import { Partners } from '../components/Partners'
import { Pipeline } from '../components/Pipeline'
import './Whatwedo.scss'

export const WhatWeDo = () => {
    return (
        <Fragment>
            <section className="whatwedo__banner" >
                <div className="whatwedo__layer">
                    <img className="banner-image" src={"../img/banner-homepage.png"} />
                    <img className="whatwedo-banner-small" src={"../img/banner-homepage-small.png"} />
                    <div className="banner-left-layer">
                        <div className="whatwedo__title"><span>Evolving</span> the Digital Worlds</div>
                        <div className="whatwedo__text">
                            <span>
                                Expert guidance for simple solutions
                            </span>
                            <span>
                                Customized Performance Capture
                            </span>
                            <span>
                                Stage & System Architecture & Construction
                            </span>
                            <span>
                                Hardware & Software Engineering
                            </span>
                            <span>
                                Expertise & Forecast of Industry 
                            </span>
                        </div>
                        <a className="whatwedo__getintouch-container" href="/#contact">
                            <button className="button whatwedo__getintouch">Get in touch</button>
                        </a>
                    </div>
                    <img className="banner-upper-layer" src={"../img/banner-whatwedo-page.png"} />
                </div>
            </section>
            <Expertise />
            <Pipeline />
            <Partners />
            <Contact />
        </Fragment>
    )
}