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
                            <span>Volumetric Video Capture</span>
                            <span>Markerless Motion Capture</span>
                            <span>Pose Estimation & Cloth Segmentation</span>
                            <span>Mesh and UV Sequence Uniformity</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-bottom.png"} />
                            <span>Virtual Production Consultation Services</span>
                            <span>Design, Software Deployment & Installation</span>
                            <span>Expert Onsite Supervision</span>
                            <span>Data Mangement and IT Services</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-top.png"} />
                            <span>Character AI & Crowd Logic for Production</span>
                            <span>Virtual Events and Simulated Live Audience</span>
                            <span>Universal Plugin Development</span>
                            <span>Realtime & USD Render Pipelines</span>
                        </div>
                        <div className="expertise__item">
                            <img className="expertise__puzzle-image" src={"../img/expertise-puzzle-left.png"} />
                            <span>Predictive & Physically Accurate CG Cloth</span>
                            <span>Logo Branding and Texture Modification</span>
                            <span>Hair, Prop and Jewelry Integration</span>
                            <span>Compatible with WebGL</span>
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