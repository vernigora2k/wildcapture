import React, { Fragment, useState } from 'react';
import './Pipeline.scss'

export const Pipeline = () => {
    

    return (
        <section className="pipeline">
            <div className="pipeline__shell">
                <div className="pipeline__layer">
                    <div className="pipeline__title">Pipeline</div> 
                    <div className="pipeline__main">
                        <div className="pipeline__item pipeline__item1">
                            <span className="pipeline__item-caption">Capture</span>
                            <span className="pipeline__item-description">Shoot Content Survey Performance or Location Data</span>
                            <span className="pipeline__item-number">1</span>
                        </div>
                        <div className="pipeline__item pipeline__item2">
                            <span className="pipeline__item-caption">Processing</span>
                            <span className="pipeline__item-description">Conforming Content at Highest Quality Standards</span>
                            <span className="pipeline__item-number">2</span>
                        </div>
                        <div className="pipeline__item pipeline__item3">
                            <span className="pipeline__item-caption">AI</span>
                            <span className="pipeline__item-description">Optimize Content & Provide Skeletal and Segmentation Data, Mesh Uniform Solver</span>
                            <span className="pipeline__item-number">3</span>
                        </div>
                        <div className="pipeline__item pipeline__item4">
                            <span className="pipeline__item-caption">Post production & engineering</span>
                            <span className="pipeline__item-description">Asset Prep & Cleanup, Scene Integration, Interactivity & sound. </span>
                            <span className="pipeline__item-number">4</span>
                        </div>
                        <div className="pipeline__item pipeline__item5">
                            <span className="pipeline__item-caption">Delivery</span>
                            <span className="pipeline__item-description">Deliver Best Quality with Extreme Versatility</span>
                            <span className="pipeline__item-number">5</span>
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