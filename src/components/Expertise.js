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
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-right.png"} />
                            <span>Realistic CG Characters for Virtual</span>
                            <span>Production, Broadcast,</span>
                            <span>Film,</span>
                            <span>Experiential & Mixed Reality</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-bottom.png"} />
                            <span>A to Z Realtime Production Pipeline Solutions</span>
                            <span>Color, Light and Photography Mastery</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-top.png"} />
                            <span>Character AI & Crowd Logic for Production,</span>
                            <span>Game Engine Plugins,</span>
                            <span>Virtual Events and Simulated Live Audience</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-left.png"} />
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