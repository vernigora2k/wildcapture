import React from 'react';
import { Canvas } from 'react-three-fiber';
import { MeshLambertMaterial } from 'three';
import { OrbitControls } from '@react-three/drei';
import './CanvasThreeJS.scss';

const Box = () => {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" />
            <MeshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    )
}

export const CanvasThreeJS = () => {
    return (
        <Canvas>
            <OrbitControls />
            <Box />
        </Canvas>
    )
}