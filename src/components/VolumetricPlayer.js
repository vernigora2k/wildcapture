import React, { useEffect, useRef } from 'react';
import DracosisPlayer from "../lib/Player"
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export const VolumetricPlayer = (props) => {
  console.log('props', props);
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (typeof container === "undefined") {
      return;
    }

    let w = container.clientWidth,
      h = container.clientHeight;
    const scene = new Scene(),
      camera = new PerspectiveCamera(75, w / h, 0.001, 100),
      controls = new OrbitControls(camera, container),
      renderConfig = { antialias: true, alpha: true },
      renderer = new WebGLRenderer(renderConfig);
    controls.target = new Vector3(0, 1, 0);
    controls.panSpeed = 0.4;
    camera.position.set(0, 0, -1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', function () {
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    })

    function render() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      controls.update();
    }

    console.log('create new player');
    const DracosisSequence = new DracosisPlayer({
      scene,
      renderer,
      meshFilePath: props.meshFilePath,
      videoFilePath: props.videoFilePath
    });

    render();
    DracosisSequence.play();

    return () => {
      // clear volumetric player
      // DracosisSequence.dispose();
    }
  }, []);

  // this is play button
  // onClick={(e) => DracosisSequence.play()}
  return <div style={props.style} ref={containerRef}></div>;
}
