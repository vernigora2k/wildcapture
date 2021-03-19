import React from 'react';
import './About.scss'

export const About = () => {
    const handleSubmit = e => {
        e.preventDefault()
        console.log('Get in touch')
    }

    return (
        <section className="about" id="about">
            <div className="about__shell" style={{ backgroundImage: "url(img/pirja4ko-temp.png)"}}>
                <div className="about__layer">
                <div className="about__title"><span>WILD </span>CAPTURE </div>
                    <div className="about__text">
                        <span>
                            A-to-Z Consulting Solutions for Virtual Production, XR and VFX 
                        </span>
                        <span>
                            Functional Volumetric Video Assets Optimized for Any Delivery
                        </span>
                        <span>
                            Advanced Performance Capture Machine Learning Workflows
                        </span>
                    </div>
                    <form className="about__button-container" method="LINK" action="/#contact">
                        <button className="button about__button" onSubmit={handleSubmit}>Get in touch</button>
                    </form>
                </div>
                <div className="about__logo">
                    <img src={"../img/about-main-image.svg"} />
                </div>
                <div className="about__sidebar">
                    <ul>
                        <li className="about__sidebar-item">
                            <span className="sidebar-item__caption">What we do</span>
                        </li>
                        <li className="about__sidebar-item sidebar-item_active">
                            <span className="sidebar-item__caption"> About</span>
                        </li>
                        <li className="about__sidebar-item">
                            <span className="sidebar-item__caption">Work</span>
                        </li>
                        <li className="about__sidebar-item">
                            <span className="sidebar-item__caption">Contact</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
