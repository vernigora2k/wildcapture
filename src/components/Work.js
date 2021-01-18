import React, { Fragment, useState } from 'react';
import './Work.scss'

export const Work = () => {
    const [isMoreWorks, setIsMoreWorks] = useState(false);

    const workVideos = {
        name1: 'work-video-item.png',
        name2: 'work-video-item.png',
        name3: 'work-video-item.png',
        name4: 'work-video-item.png',
        name5: 'work-video-item.png',
        name6: 'work-video-item.png',
        name7: 'work-video-item.png',
        name8: 'work-video-item.png',
    }

    const moreWorkToggle = () => {
        setIsMoreWorks(!isMoreWorks)
    }

    return (
        <section className="work" id="work">
            <div className="work__shell">
                <div className="work__layer">
                    <div className="work__title">Real Digital People</div>
                    <div className="work__videos">
                        {!isMoreWorks ? 
                            Object.entries(workVideos).slice(1,4).map(([name, value]) => {return (
                            <div className="work__videos-item" id="work__videos-item">
                                <span className="videos-item-caption">
                                    {name}
                                </span>
                                <div className="videos-item-content" style={{ backgroundImage: `url(img/${value})` }}>
                                </div>
                            </div>
                            )}) 
                        :   Object.entries(workVideos).map(([name, value]) => {return (
                            <div className="work__videos-item" id="work__videos-item">
                                <span className="videos-item-caption">
                                    {name}
                                </span>
                                <div className="videos-item-content" style={{ backgroundImage: `url(img/${value})` }}>
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