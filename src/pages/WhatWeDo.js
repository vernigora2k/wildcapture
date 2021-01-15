import React, { Fragment } from 'react'
import './Whatwedo.scss'

export const WhatWeDo = () => {
    return (
        <Fragment>
            <section className="home-banner" >
                <img className="banner-image" src={"../img/banner-homepage.png"} />
                <div className="banner-left-layer"></div>
                <img className="banner-upper-layer" src={"../img/banner-whatwedo-page.png"} />
            </section>
        </Fragment>
    )
}

// style={{ backgroundImage: "url(img/banner-whatwedo-page.png)"}}