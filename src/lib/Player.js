/* eslint-disable */

/**
 * @typedef {object} ManifestFrameDataItem
 * @property {number} frameNumber
 * @property {number} keyframeNumber
 * @property {number} startBytePosition
 * @property {number} vertices
 * @property {number} faces
 * @property {number} meshLength
 * @property {"mesh"} type
 */

/**
 * @typedef {object} ManifestData
 * @property {number} frameRate
 * @property {number} maxVertices
 * @property {number} maxTriangles
 * @property {ManifestFrameDataItem[]} frameData
 */

/**
 * @typedef {object} WorkerKeyframeBufferObject
 * @property {number} frameNumber
 * @property {number} keyframeNumber
 * @property bufferGeometry
 */
/**
 * @typedef {object} WorkerMeshData
 * @property {WorkerKeyframeBufferObject} keyframeBufferObject
 */

import Blob from 'cross-blob';
import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial, PlaneBufferGeometry, sRGBEncoding, Uint32BufferAttribute, VideoTexture } from 'three';
import RingBuffer from './RingBuffer';
import { workerFunction } from './workerFunction';
export default class DracosisPlayer {
    constructor({ scene, renderer, meshFilePath, videoFilePath, frameRate = 25, loop = true, autoplay = true, scale = 1, keyframesToBufferBeforeStart = 200 }) {
        this._debugLevel = 0;
        // Public Fields
        this.frameRate = 30;
        this.speed = 1.0; // Multiplied by framerate for final playback output rate
        // Private Fields
        this._scale = 1;
        this._prevFrame = 0;
        this.currentKeyframe = 0;
        /**
         *
         * @type {HTMLMediaElement}
         * @private
         */
        this._video = null;
        this._videoTexture = null;
        this._loop = true;
        this._isinitialized = false;
        /**
         *
         * @type {"paused","playing","buffering","error"}
         * @private
         */
        this._status = 'paused';
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
        /**
         *
         * @param {WorkerMeshData} frameData
         */
        const handleFrameData = (frameData) => {
            if (this._debugLevel > 2) {
                console.log("Adding frame data: ", frameData);
            }
            // console.warn('.....NOT ADDING'); return;
            let geometry = new BufferGeometry();
            geometry.setIndex(new Uint32BufferAttribute(frameData.keyframeBufferObject.bufferGeometry.index, 1));
            geometry.setAttribute('position', new Float32BufferAttribute(frameData.keyframeBufferObject.bufferGeometry.position, 3));
            geometry.setAttribute('uv', new Float32BufferAttribute(frameData.keyframeBufferObject.bufferGeometry.uv, 2));
            // TODO: may be this should be set by index? like 'frameNumber', not sure if frames ALWAYS get here in proper order
            this.meshBuffer.add({ ...frameData.keyframeBufferObject, bufferGeometry: geometry });
            if (this._status === "buffering") {
                // TODO: handle our inconsecutive frames loading, now i assume that all previous frames are loaded
                const bufferingSize = this.frameRate * 2;
                const bufferedEnough = this.meshBuffer.getPos() > (this.currentKeyframe+bufferingSize);
                const bufferedCompletely = frameData.keyframeBufferObject.keyframeNumber === this.numberOfKeyframes;
                if (this._debugLevel > 0) {
                    console.log('...buffering +', frameData.keyframeBufferObject.keyframeNumber - this.currentKeyframe, ' ... ', frameData.keyframeBufferObject.keyframeNumber, ' / ', this.numberOfKeyframes);
                }
                if (bufferedEnough || bufferedCompletely) {
                    if (this._debugLevel > 0) {
                        console.log('.....ready to resume playback');
                    }
                    this._status = "playing";
                    this._video.play();
                    if (!this.mesh.visible) {
                        this.mesh.visible = true;
                    }
                } else {
                    this._triggerEvent('mesh-frames-buffering', frameData.keyframeBufferObject.keyframeNumber / (this.currentKeyframe+bufferingSize));
                }
            }
            // if(frameData.iframeBufferObjects) frameData.iframeBufferObjects.forEach(obj => {
            //   this.iframeVertexBuffer.add(obj);
            // })
        };
        worker.onmessage = (e) => {
            switch (e.data.type) {
                case 'initialized':
                    if (this._debugLevel > 0) {
                        console.log("Worker initialized");
                    }
                    break;
                case 'framedata':
                    if (this._debugLevel > 2) {
                        console.log("Frame data received");
                    }
                    handleFrameData(e.data.payload);
                    this._triggerEvent('mesh-frames-progress', {
                        current: e.data.payload.keyframeBufferObject.keyframeNumber,
                        total: this.numberOfKeyframes
                    });
                    break;
                case 'completed':
                    if (this._debugLevel > 0) {
                        console.log("Worker complete!");
                    }
                    this._triggerEvent('mesh-frames-finished');
                    break;
            }
            //console.log('Worker said: ', e.data); // message received from worker
        };
        this.keyframesToBufferBeforeStart = keyframesToBufferBeforeStart;
        // Set class values from constructor
        this.scene = scene;
        this.renderer = renderer;
        this.meshFilePath = meshFilePath;
        this.manifestFilePath = meshFilePath.replace('drcs', 'manifest');
        this._eventsListeners = {
            'video-started': new Set(),
            'video-error': new Set(),
            'mesh-frames-started': new Set(),
            'mesh-frames-progress': new Set(),
            'mesh-frames-finished': new Set(),
            'mesh-frames-buffering': new Set(),
            'video-frame-handler': new Set(),
            'frame-show': new Set(),
            'error': new Set(),
        }
        this._loop = loop;
        this._scale = scale;
        this._video = document.createElement('video');
        this._video.crossorigin = "anonymous";
        this._video.setAttribute("playsinline", "playsinline");
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
        // this._video.controls = true;

        this._video.playbackRate = 1;
        this.requestVideoFrameCallback();
        // Create a default mesh
        this.material = new MeshBasicMaterial({ map: this._videoTexture });
        this.failMaterial = new MeshBasicMaterial({ color: '#555555' });
        this.mesh = new Mesh(new PlaneBufferGeometry(0.00001, 0.00001), this.material);
        this.mesh.scale.set(this._scale, this._scale, this._scale);
        this.scene.add(this.mesh);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4)
                return;
            /**
             *
             * @type {ManifestData}
             */
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
            if (this._debugLevel > 0) {
                console.log("Is inited");
            }
        };
        xhr.open('GET', this.manifestFilePath, true); // true for asynchronous
        xhr.send();

        this.play = () => {
            this._video.play().then(() => {
                // clearInterval(buffering);
                // console.log('playing');
            }).catch(e => {
                console.log('error on play()', e);
            });
            if (this._debugLevel > 0) {
                console.log("Playing");
            }
            // const buffering = setInterval(() => {
            //     if (this.meshBuffer && this.meshBuffer.getBufferLength() >= this.keyframesToBufferBeforeStart) {
            //         // console.log("Keyframe buffer length is ", this.meshBuffer.getBufferLength(), ", playing video");
            //         clearInterval(buffering);
            //
            //
            //         this.mesh.visible = true;
            //     } else {
            //         this._triggerEvent('mesh-frames-buffering', this.meshBuffer.getBufferLength() / this.keyframesToBufferBeforeStart);
            //     }
            // }, 1000 / 60);
            // this.bufferingTimer = buffering;
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


    addEventListener(eventType, callback) {
        if (typeof this._eventsListeners[eventType] !== 'undefined') {
            this._eventsListeners[eventType].add(callback);
        } else {
            console.error('unsupported event type', eventType);
        }
    }

    _triggerEvent(eventType, eventData) {
        // console.log('_triggerEvent', eventType, eventData);
        if (typeof this._eventsListeners[eventType] !== 'undefined') {

            this._eventsListeners[eventType].forEach(callback => {
                if (typeof callback === 'function') {
                    callback(eventData);
                }
            });
        } else {
            console.error('unsupported event type', eventType);
        }
    }

    requestVideoFrameCallback() {
        if ('requestVideoFrameCallback' in this._video) {
            this._video.requestVideoFrameCallback(this.videoUpdateHandler.bind(this));
        } else {
            requestAnimationFrame(this.videoAnimationFrame.bind(this));
        }
    }

    /**
     * emulated video frame callback trigger
     * bridge from requestVideoFrameCallback to videoUpdateHandler
     * @param now
     */
    videoAnimationFrame(now) {
        const keyFrame = Math.round(this._video.currentTime * this.frameRate);
        if (keyFrame === this.currentKeyframe) {
            // same keyframe, skip videoUpdateHandler, re-requestNextAnimationFrame
            this.requestVideoFrameCallback();
            return;
        }

        this.videoUpdateHandler(now, {
            mediaTime: this._video.currentTime,
            presentedFrames: keyFrame // we use presentedFrames only for check, so no need to be precise here
        });
    }

    /**
     *
     * @param {number} now
     * @param {{mediaTime:number, presentedFrames:number}} metadata
     */
    videoUpdateHandler(now, metadata) {
        if (this._debugLevel > 0) {
            console.log("videoUpdateHandler");
        }
        if (!this._isinitialized)
            return console.warn("videoUpdateHandler: player is not initialized");

        let frameToPlay = Math.round(metadata.mediaTime * this.frameRate);
        if (this._debugLevel > 0) {
            console.log("Frame to play is", frameToPlay);
        }
        const keyframeToPlay = this.fileHeader.frameData[frameToPlay].keyframeNumber;
        if (!this._video){
            return
        }
        if (Math.round(this._video.currentTime * this.frameRate) !== metadata.presentedFrames) {
            if (this._debugLevel > 0) {
                console.log('==========DIFF', Math.round(this._video.currentTime * this.frameRate), Math.round(metadata.mediaTime * this.frameRate), metadata.presentedFrames, metadata);
            }
        }
        let hasKeyframe = true;
        if (hasKeyframe && frameToPlay !== this._prevFrame) {
            this._prevFrame = frameToPlay;
            const isNewKeyframe = keyframeToPlay !== this.currentKeyframe;
            if (this._debugLevel > 0) {
                console.log("Looped frame to play is: ", frameToPlay, "| Current keyframe is: ", this.currentKeyframe, "| Requested Keyframe is: ", keyframeToPlay, "|Is new?", isNewKeyframe);
            }
            // console.log("Looped frame to play is", loopedFrameToPlay, "| Keyframe to play is", keyframeToPlay, "|Is new keyframe?", newKeyframe);
            if (isNewKeyframe) {
                this.currentKeyframe = keyframeToPlay;
                if (this._debugLevel > 0) {
                    console.log("***** Keyframe to play");
                    console.log("Mesh buffer length is, ", this.meshBuffer.getBufferLength());
                    console.log("Mesh buffer.getPos, ", this.meshBuffer.getPos());
                }
                // If keyframe changed, set mesh buffer to new keyframe
                const meshBufferPosition = this.getPositionInKeyframeBuffer(keyframeToPlay);
                if (this._debugLevel > 0) {
                    console.log("Mesh buffer position is: ", meshBufferPosition);
                }

                // if (meshBufferPosition >= (this.meshBuffer.getPos() - 1)) {
                //     console.warn('buffering', meshBufferPosition, this.meshBuffer.getPos());
                //
                // } else
                if (meshBufferPosition === -1) {
                    this._status = "buffering";
                    if (!this._video.paused) {
                        this._video.pause();
                    }
                    this._triggerEvent('mesh-frames-buffering', 0);
                    // this.mesh.visible = false;
                    // this._video.pause();
                    this.mesh.material = this.failMaterial;
                } else {
                    this.mesh.material = this.material;
                    this.mesh.geometry = this.meshBuffer.get(meshBufferPosition).bufferGeometry;
                    this._triggerEvent('frame-show', keyframeToPlay);
                }
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
        this.requestVideoFrameCallback();
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
