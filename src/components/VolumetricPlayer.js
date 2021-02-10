import React, { useEffect, useRef } from 'react';
import DracosisPlayer from "../lib/Player"
import {
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
  // Mesh, SphereBufferGeometry, BoxBufferGeometry,
  // MeshNormalMaterial
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import './VolumetricPlayer.scss'

const cameraOrbitingHeight = 1.7;
const cameraDistance = 6.5;
const cameraVerticalOffset = 0.4;
const cameraFov = 35;

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
      camera = new PerspectiveCamera(cameraFov, w / h, 0.001, 100),
      controls = new OrbitControls(camera, container),
      renderConfig = { antialias: true, alpha: true };
    if (!rendererRef.current) {
      rendererRef.current = new WebGLRenderer(renderConfig);
    }
    let renderer = rendererRef.current;
    controls.target = new Vector3(0, cameraOrbitingHeight, 0);
    controls.panSpeed = 0.4;
    camera.position.set(0, cameraOrbitingHeight, cameraDistance);
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
      setCameraOffset();
    }
    window.addEventListener('resize',onResize)

    /**
     * shift camera from it's center
     */
    function setCameraOffset() {
      const fullWidth = w;
      const fullHeight = h + h * Math.abs(cameraVerticalOffset);
      const width = w;
      const height = h;
      const x = 0;
      const y = h * cameraVerticalOffset;
      /*
      fullWidth — full width of multiview setup
      fullHeight — full height of multiview setup
      x — horizontal offset of subcamera
      y — vertical offset of subcamera
      width — width of subcamera
      height — height of subcamera
       */
      camera.setViewOffset( fullWidth, fullHeight, x, y, width, height);
    }
    setCameraOffset();

    function render() {
      animationFrameId = requestAnimationFrame(render);
      renderer.render(scene, camera);
      controls.update();
    }

    console.log('create new player');
    // dummy to test
    // const box = new Mesh(
    //   new BoxBufferGeometry(0.5, 1.45, 0.5),
    //   new MeshNormalMaterial()
    // );
    // box.position.y = 1.45 / 2;
    // scene.add(box);
    //
    // const head = new Mesh(
    //   new SphereBufferGeometry(0.25),
    //   new MeshNormalMaterial()
    // );
    // head.position.y = 1.7;
    // scene.add(head);

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
