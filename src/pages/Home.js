import React, { Fragment } from 'react'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Work } from '../components/Work'
import './Home.scss'

export const Home = () => {
    return (
        <Fragment>
            <section className="home-banner">
                <img src={"../img/banner-homepage.png"} />
            </section>
            <About />
            <Work />
            <Contact />
        </Fragment>
        
    )
}