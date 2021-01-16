import React, { Fragment, useState } from 'react'
import './Whatwedo.scss'

export const WhatWeDo = () => {
    // const [whatWeDoPage, setWhatWeDoPage] = useState(window.location.href.includes('whatwedo'))
    return (
        <Fragment>
            <section className="whatwedo-banner" >
                <img className="banner-image" src={"../img/banner-homepage.png"} />
                <div className="banner-left-layer">
                    
                    {/* <div className="whatwedo__logo"></div> */}
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

                </div>
                <img className="banner-upper-layer" src={"../img/banner-whatwedo-page.png"} />
            </section>
        </Fragment>
    )
}

// style={{ backgroundImage: "url(img/banner-whatwedo-page.png)"}}