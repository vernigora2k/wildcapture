import React, { useEffect, useRef } from 'react';
import DracosisPlayer from "../lib/Player"
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer, sRGBEncoding } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import './VolumetricPlayer.scss'

export const VolumetricPlayer = (props) => {
  console.log('props', props);
  /**
   *
   * @type {React.MutableRefObject<HTMLElement>}
   */
  const containerRef = useRef();
  /**
   *
   * @type {React.MutableRefObject<WebGLRenderer>}
   */
  const rendererRef = useRef(null);
  let animationFrameId;

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
      renderConfig = { antialias: true, alpha: true };
    if (!rendererRef.current) {
      rendererRef.current = new WebGLRenderer(renderConfig);
    }
    let renderer = rendererRef.current;
    controls.target = new Vector3(0, 1, 0);
    controls.panSpeed = 0.4;
    camera.position.set(0, 1.7, 1.5);
    camera.lookAt(controls.target);
    renderer.outputEncoding = sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);
    const onResize = function () {
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize',onResize)

    function render() {
      animationFrameId = requestAnimationFrame(render);
      renderer.render(scene, camera);
      controls.update();
    }

    console.log('create new player');
    const DracosisSequence = new DracosisPlayer({
      scene,
      renderer,
      meshFilePath: props.meshFilePath,
      videoFilePath: props.videoFilePath,
      autoplay: false
    });

    render();
    DracosisSequence.play();

    return () => {
      // clear volumetric player
      // DracosisSequence.dispose();
      if (DracosisSequence._video) {
        // DracosisSequence._video.stop();
        DracosisSequence._video.parentElement.removeChild(DracosisSequence._video)
        DracosisSequence._video = null
        DracosisSequence._videoTexture.dispose()
        DracosisSequence._videoTexture = null
        window.removeEventListener("resize", onResize)
        cancelAnimationFrame(animationFrameId)
        controls.dispose()
        DracosisSequence.worker.terminate()
        if (DracosisSequence.bufferingTimer) {
          clearInterval(DracosisSequence.bufferingTimer)
        }
        if (DracosisSequence.meshBuffer) {
          DracosisSequence.meshBuffer.array?.forEach(element => {
            if (element) {
              element.bufferGeometry.dispose()
            }
          })
          DracosisSequence.meshBuffer.clear()
        }
      }
    }
  }, []);

  // this is play button
  // onClick={(e) => DracosisSequence.play()}
  return <div className= "volumetric__player" style={props.style} ref={containerRef}></div>;
}
