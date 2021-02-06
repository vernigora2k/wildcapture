import React from 'react';
import './Expertise.scss'

export const Expertise = () => {
    return (
        <section className="expertise">
            <div className="expertise__shell">
                <div className="expertise__layer">
                    <div className="expertise__title">Expertise</div>
                    <div className="expertise__main">
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-right.svg"} />
                            <span>Realistic CG Characters for Virtual</span>
                            <span>Production, Broadcast,</span>
                            <span>Film,</span>
                            <span>Experiential & Mixed Reality</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-bottom.svg"} />
                            <span>A to Z Realtime Production Pipeline Solutions</span>
                            <span>Color, Light and Photography Mastery</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-top.svg"} />
                            <span>Character AI & Crowd Logic for Production,</span>
                            <span>Game Engine Plugins,</span>
                            <span>Virtual Events and Simulated Live Audience</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-left.svg"} />
                            <span>Delivery to All Formats and Mediums,</span>
                            <span>Deploy to All Devices, </span>
                            <span>WebGL Expertise, </span>
                            <span>Game Authoring</span>
                        </div>
                    </div>
                    <div className="expertise__left-image">
                        <img src={"../img/expertise-left-image.svg"} />
                    </div>
                    <div className="expertise__right-image">
                        <img src={"../img/expertise-right-image.svg"} />
                    </div>
                    
                </div>
            </div>
        </section>
    )
}