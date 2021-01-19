import React from 'react';
import './Partners.scss'

export const Partners = () => {
    const workVideos = {
        logo1: 'partners-logo-WMR.png',
        logo2: 'partners-logo-TetaVi.png',
        logo3: 'partners-logo-sidefx.svg',
        logo4: 'partners-logo-quixel.png',
        logo5: 'partners-logo-evercoast.png',
        logo6: 'partners-logo-epicgames.png',
        logo7: 'partners-logo-DNE.png',
        logo8: 'partners-logo-captury.png',
        logo9: 'partners-logo-4d.svg',
    }
    
    return (
        <section className="partners">
            <div className="partners__shell">
                <div className="partners__layer">
                    <div className="partners__title">Partners</div>
                    <div className="partners__main">
                        {Object.entries(workVideos).map(([name, value]) => {return (
                            <div className="partners__item-shell" key={name} >
                                <div className="partners__item" style={{ backgroundImage: `url(img/${value})` }}></div>
                            </div>    
                        )})}
                    </div>
                    <div className="partners__image">
                        <img src={"../img/partners-main-image.svg"} />
                    </div>
                    
                </div>
            </div>
        </section>
    )
}