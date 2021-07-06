import React, { Fragment } from 'react'
import { VolumetricPlayer } from '../components/VolumetricPlayer';
import './Volumetric.scss'

export const SamB = () => {
  const meshFilePath = document.location.origin + "/samburchfield_tryagain_low.drcs";
  const videoFilePath = document.location.origin + "/samburchfield_tryagain_low.mp4";
    return (
        <Fragment>
            <section className="volumetric__wrapper" >
              <VolumetricPlayer style={{ width: '100%', height: '100%' }} meshFilePath={meshFilePath} videoFilePath={videoFilePath} />
            </section>
        </Fragment>
    )
}