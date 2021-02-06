/* eslint-disable */

import Blob from 'cross-blob';
import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial, PlaneBufferGeometry, sRGBEncoding, Uint32BufferAttribute, VideoTexture } from 'three';
import RingBuffer from './RingBuffer';
import { workerFunction } from './workerFunction';
export default class DracosisPlayer {
    constructor({ scene, renderer, meshFilePath, videoFilePath, frameRate = 25, loop = true, autoplay = true, scale = 1, keyframesToBufferBeforeStart = 200 }) {
        // Public Fields
        this.frameRate = 30;
        this.speed = 1.0; // Multiplied by framerate for final playback output rate
        // Private Fields
        this._scale = 1;
        this._prevFrame = 0;
        this.currentKeyframe = 0;
        this._video = null;
        this._videoTexture = null;
        this._loop = true;
        this._isinitialized = false;
        this.tempBufferObject = {
            frameNumber: 0,
            keyframeNumber: 0,
            bufferGeometry: null
        };
        this.numberOfKeyframes = 0;
        this.numberOfIframes = 0;
        // Start loop to check if we're ready to play
        
        var dataObj = '(' + workerFunction + ')();'; // here is the trick to convert the above fucntion to string
        var blob = new Blob([dataObj.replace('"use strict";', '')], { type: 'application/javascript' }); // firefox adds "use strict"; to any function which might block worker execution so knock it off
        var blobURL = (window.URL ? URL : webkitURL).createObjectURL(blob);
        var worker = new Worker(blobURL); // spawn new worker
        this.worker = worker;
        const handleFrameData = (frameData) => {
            console.log("Adding frame data: ", frameData);
            let geometry = new BufferGeometry();
            geometry.setIndex(new Uint32BufferAttribute(frameData.keyframeBufferObject.bufferGeometry.index, 1));
            geometry.setAttribute('position', new Float32BufferAttribute(frameData.keyframeBufferObject.bufferGeometry.position, 3));
            geometry.setAttribute('uv', new Float32BufferAttribute(frameData.keyframeBufferObject.bufferGeometry.uv, 2));
            this.meshBuffer.add({ ...frameData.keyframeBufferObject, bufferGeometry: geometry });
            // if(frameData.iframeBufferObjects) frameData.iframeBufferObjects.forEach(obj => {
            //   this.iframeVertexBuffer.add(obj);
            // })
        };
        worker.onmessage = function (e) {
            switch (e.data.type) {
                case 'initialized':
                    console.log("Worker initialized");
                    break;
                case 'framedata':
                    console.log("Frame data received");
                    handleFrameData(e.data.payload);
                    break;
                case 'completed':
                    console.log("Worker complete!");
                    break;
            }
            console.log('Worker said: ', e.data); // message received from worker
        };
        this.keyframesToBufferBeforeStart = keyframesToBufferBeforeStart;
        // Set class values from constructor
        this.scene = scene;
        this.renderer = renderer;
        this.meshFilePath = meshFilePath;
        this.manifestFilePath = meshFilePath.replace('drcs', 'manifest');
        this._loop = loop;
        this._scale = scale;
        this._video = document.createElement('video');
        this._video.crossorigin = "anonymous";
        this._video.loop = true;
        this._video.src = videoFilePath;
        this._videoTexture = new VideoTexture(this._video);
        this._videoTexture.crossorigin = "anonymous";
        this._videoTexture.encoding = sRGBEncoding;
        this.frameRate = frameRate;
        // Add video to dom and bind the upgdate handler to playback
        document.body.appendChild(this._video);
        this._video.style.position = 'fixed';
        this._video.style.zIndex = '-1';
        this._video.style.top = '0';
        this._video.style.left = '0';
        this._video.style.width = '1px';

        this._video.playbackRate = 1;
        this._video.requestVideoFrameCallback(this.videoUpdateHandler.bind(this));
        console.log("**** requestVideoFrameCallback");
        // Create a default mesh
        this.material = new MeshBasicMaterial({ map: this._videoTexture });
        this.mesh = new Mesh(new PlaneBufferGeometry(0.00001, 0.00001), this.material);
        this.mesh.scale.set(this._scale, this._scale, this._scale);
        this.scene.add(this.mesh);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4)
                return;
            this.fileHeader = JSON.parse(xhr.responseText);
            this.frameRate = this.fileHeader.frameRate;
            // Get count of frames associated with keyframe
            const numberOfIframes = this.fileHeader.frameData.filter(frame => frame.keyframeNumber !== frame.frameNumber).length;
            const numberOfKeyframes = this.fileHeader.frameData.filter(frame => frame.keyframeNumber === frame.frameNumber).length;
            this.numberOfIframes = numberOfIframes;
            this.numberOfKeyframes = numberOfKeyframes;
            this.meshBuffer = new RingBuffer(numberOfKeyframes);
            this.iframeVertexBuffer = new RingBuffer(numberOfIframes);
            if (autoplay) {
                console.log("******* INITIALIZE");
                // Create an event listener that removed itself on input
                const eventListener = () => {
                    console.log("******* PLAY");
                    // If we haven't inited yet, notify that we have, autoplay content and remove the event listener
                    this.play();
                    document.body.removeEventListener("mousedown", eventListener);
                };
                document.body.addEventListener("mousedown", eventListener);
            }
            worker.postMessage({ type: "initialize", payload: { meshFilePath, numberOfKeyframes: this.numberOfKeyframes, fileHeader: this.fileHeader } }); // Send data to our worker.
            this._isinitialized = true;
            console.log("Is inited");
        };
        xhr.open('GET', this.manifestFilePath, true); // true for asynchronous
        xhr.send();

        this.play = () => {
            console.log("Playing");
            const buffering = setInterval(() => {
                if (this.meshBuffer && this.meshBuffer.getBufferLength() >= this.keyframesToBufferBeforeStart) {
                    console.log("Keyframe buffer length is ", this.meshBuffer.getBufferLength(), ", playing video");
                    clearInterval(buffering);
                    this._video.play();
                    this.mesh.visible = true;
                }
            }, 1000 / 60);
            this.bufferingTimer = buffering;
        };
    }
    // public getters and settings
    get currentFrame() {
        return this.currentKeyframe;
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
    }
    videoUpdateHandler(now, metadata) {
        console.log("videoUpdateHandler");
        if (!this._isinitialized)
            return console.warn("Not inited");
        let frameToPlay = Math.round(metadata.mediaTime * 25);
        console.log("FRame to play is", frameToPlay);
        const keyframeToPlay = this.fileHeader.frameData[frameToPlay].keyframeNumber;
        if (!this._video){
            return
        }
        if (Math.round(this._video.currentTime * 25) !== metadata.presentedFrames)
            console.log('==========DIFF', Math.round(this._video.currentTime * 25), Math.round(metadata.mediaTime * 25), metadata.presentedFrames, metadata);
        let hasKeyframe = true;
        if (hasKeyframe && frameToPlay !== this._prevFrame) {
            this._prevFrame = frameToPlay;
            const isNewKeyframe = keyframeToPlay !== this.currentKeyframe;
            console.log("Looped frame to play is: ", frameToPlay, "| Current keyframe is: ", this.currentKeyframe, "| Requested Keyframe is: ", keyframeToPlay, "|Is new?", isNewKeyframe);
            // console.log("Looped frame to play is", loopedFrameToPlay, "| Keyframe to play is", keyframeToPlay, "|Is new keyframe?", newKeyframe);
            if (isNewKeyframe) {
                this.currentKeyframe = keyframeToPlay;
                console.log("***** Keyframe to play");
                console.log("Mesh buffer length is, ", this.meshBuffer.getBufferLength());
                // If keyframe changed, set mesh buffer to new keyframe
                const meshBufferPosition = this.getPositionInKeyframeBuffer(keyframeToPlay);
                console.log("Mesh buffer position is: ", meshBufferPosition);
                this.mesh.geometry = this.meshBuffer.get(meshBufferPosition).bufferGeometry;
            }
            else {
                const vertexBufferPosition = this.getPositionInIFrameBuffer(frameToPlay);
                if (this.iframeVertexBuffer.get(vertexBufferPosition) !== undefined) {
                    this.mesh.geometry = this.iframeVertexBuffer.get(vertexBufferPosition).vertexBuffer;
                }
                else {
                    console.warn("Skipped iframe playback, not in buffer");
                }
            }
            this.mesh.material.needsUpdate = true;
        }
        this._video.requestVideoFrameCallback(this.videoUpdateHandler.bind(this));
    }
    getPositionInKeyframeBuffer(keyframeNumber) {
        // Search backwards, which should make the for loop shorter on longer buffer
        for (let i = this.meshBuffer.getBufferLength(); i >= 0; i--) {
            if (this.meshBuffer.get(i) &&
                keyframeNumber == this.meshBuffer.get(i).frameNumber &&
                keyframeNumber == this.meshBuffer.get(i).keyframeNumber)
                return i;
        }
        return -1;
    }
    getPositionInIFrameBuffer(frameNumber) {
        // Search backwards, which should make the for loop shorter on longer buffer
        for (let i = this.iframeVertexBuffer.getBufferLength(); i >= 0; i--) {
            if (this.iframeVertexBuffer.get(i) &&
                frameNumber == this.iframeVertexBuffer.get(i).frameNumber)
                return i;
        }
        return -1;
    }
}
//# sourceMappingURL=Player.js.map
