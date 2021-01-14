import React, { Fragment } from 'react'
import { About } from '../components/About'
import './Home.scss'

export const Home = () => {
    return (
        <Fragment>
            <section className="home-banner">
                <img src={"../img/banner-homepage.png"} />
            </section>
            <About />
        </Fragment>
        
    )
}