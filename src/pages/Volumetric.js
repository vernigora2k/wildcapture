import React, { Fragment } from 'react'
import { VolumetricPlayer } from '../components/VolumetricPlayer';
import './Volumetric.scss'

export const Volumetric = () => {
  const meshFilePath = document.location.origin + "/liam.drcs";
  const videoFilePath = document.location.origin + "/liam.mp4";
    return (
        <Fragment>
            <section className="volumetric__wrapper" >
              <VolumetricPlayer style={{ width: '100%', height: '100%' }} meshFilePath={meshFilePath} videoFilePath={videoFilePath} />
            </section>
        </Fragment>
    )
}
