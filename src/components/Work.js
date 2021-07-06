import React, { Fragment, useState } from 'react';
import './Work.scss'

export const Work = () => {
    const [isMoreWorks, setIsMoreWorks] = useState(false);

    const workVideos = {
        CohortCrowdSystem: 'work-video-item.png',
        KungFu: 'work-video-kfu.png',
        EntertheTomb: 'work-video-tut.png',
        VanishingAmericanDream: 'work-video-vad.png',
        CaptainMorgan: 'work-video-cap.png',
        Obama: 'work-video-obama.png',
        DracosisWebPlayer: 'work-video-drac.png',
        Chakra: 'work-video-yoga.png',
    }

    const moreWorkToggle = () => {
        setIsMoreWorks(!isMoreWorks)
    }

    return (
        <section className="work" id="work">
            <div className="work__shell">
                <div className="work__layer">
                    <div className="work__title">Projects</div>
                    <div className="work__videos">
                        {!isMoreWorks ? 
                            Object.entries(workVideos).slice(1,4).map(([name, value]) => {return (
                            <div className="work__videos-item" id="work__videos-item" key={name}>
                                <span className="videos-item-caption">
                                    {name}
                                </span>
                                <div className="videos-item-content" style={{ backgroundImage: `url(img/${value})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                                </div>
                            </div>
                            )}) 
                        :   Object.entries(workVideos).map(([name, value]) => {return (
                            <div className="work__videos-item" id="work__videos-item" key={name}>
                                <span className="videos-item-caption">
                                    {name}
                                </span>
                                <div className="videos-item-content" style={{ backgroundImage: `url(img/${value})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                                </div>
                            </div>
                            )}) 
                        }
                    </div>
                    <button className="button work__button" onClick={moreWorkToggle}>{!isMoreWorks ? 'More' : 'Less'} works</button>
                    <div className="work__logo">
                        <img src={"../img/work-main-image.svg"} />
                    </div>
                    <div className="work__sidebar">
                        <ul>
                            <li className="work__sidebar-item">
                                <span className="sidebar-item__caption">What we do</span>
                            </li>
                            <li className="work__sidebar-item">
                                <span className="sidebar-item__caption"> About</span>
                            </li>
                            <li className="work__sidebar-item sidebar-item_active">
                                <span className="sidebar-item__caption">Work</span>
                            </li>
                            <li className="work__sidebar-item">
                                <span className="sidebar-item__caption">Contact</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}