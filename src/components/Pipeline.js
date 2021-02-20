import React from 'react';
import './Pipeline.scss'

export const Pipeline = () => {
    
    return (
        <section className="pipeline">
            <div className="pipeline__shell">
                <div className="pipeline__layer">
                    <div className="pipeline__title">Pipeline</div> 
                    <div className="pipeline__main">
                        <div className="pipeline__item pipeline__item1">
                        <span className="pipeline__item-caption">Strategy</span>
                            <span className="pipeline__item-description">Taking any concept to a feasible execution plan for cutting edge production</span>
                            <span className="pipeline__item-number"></span>
                        </div>
                        <div className="pipeline__item pipeline__item2">
                            <span className="pipeline__item-caption">Capture</span>
                            <span className="pipeline__item-description">Capturing the Human Essence with the highest quality standards</span>
                            <span className="pipeline__item-number"></span>
                        </div>
                        <div className="pipeline__item pipeline__item3">
                            <span className="pipeline__item-caption">Process</span>
                            <span className="pipeline__item-description">Using data to bring vibrant life to otherwise lifeless CG</span>
                            <span className="pipeline__item-number"></span>
                        </div>
                        <div className="pipeline__item pipeline__item4">
                            <span className="pipeline__item-caption">Post</span>
                            <span className="pipeline__item-description">Preparing Assets for Prime Time with vast functionality and incredible efficiency</span>
                            <span className="pipeline__item-number"></span>
                        </div>
                        <div className="pipeline__item pipeline__item5">
                            <span className="pipeline__item-caption">Delivery</span>
                            <span className="pipeline__item-description">Delivering to Film, TV, Games, Experiences, Installations, and a device on you.</span>
                            <span className="pipeline__item-number"></span>
                        </div>
                    </div>
                    <div className="pipeline__bottom-image">
                        <img src={"../img/pipeline-bottom-image.svg"} />
                    </div>                 
                </div>
            </div>
        </section>
    )
}