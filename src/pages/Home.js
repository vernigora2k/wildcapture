import React, { Fragment } from 'react'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Work } from '../components/Work'
import './Home.scss'

export const Home = () => {
    return (
        <Fragment>
            <section className="home-banner">
                <video autoPlay loop muted>
                    <source src="../movie/banner-slide-movie.mp4"></source>
                </video>
                <img className="home-banner-large" src={"../img/banner-homepage.png"} />
                <img className="home-banner-small" src={"../img/banner-homepage-small.png"} />
            </section>
            <About />
            <Work />
            <Contact />
        </Fragment>
        
    )
}