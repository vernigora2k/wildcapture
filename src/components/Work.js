import React, { Fragment, useState } from 'react';
import './Work.scss'

export const Work = () => {
    const [isMoreWorks, setIsMoreWorks] = useState(false);

    const workVideos = [
        {name1: 'work-video-item.png'},
        {name2: 'work-video-item.png'},
        {name3: 'work-video-item.png'},
        {name4: 'work-video-item.png'},
        {name5: 'work-video-item.png'},
        {name6: 'work-video-item.png'},
    ]

    return (
        <section className="work">
            <div className="work__shell">
                <div className="work__layer">
                <div className="work__title">Real Digital People</div>
                    <div className="work__videos">
                        {Object.entries(workVideos).map(item => {return (
                            <div className="work__videos-item">
                                <span className="videos-item-caption">
                                    {console.log(item[1])}
                                    {item[0]}
                                </span>
                                <div className="videos-item-content">

                                </div>
                            </div>
                        )})}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}