import React, { Fragment } from 'react'
import { VolumetricPlayer } from '../components/VolumetricPlayer';
import './Volumetric.scss'

export const Volumetric = () => {
    return (
        <Fragment>
            <section className="volumetric__wrapper" >
            <VolumetricPlayer style={{ width: '100%', height: 500 }} meshFilePath={"http://localhost:3000/liam.drcs"} videoFilePath={"http://localhost:3000/liam.mp4"} />
            </section>
        </Fragment>
    )
}