import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import * as blazeface from '@tensorflow-models/blazeface';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [faces, setFaces] = useState(0);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }; // const capture = () => {

  const runFaceDetection = async () => {
    const model = await blazeface.load();
    setInterval(() => {
      detect(model);
    }, 10);
  };

  const detect = async (model) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const predictions = await model.estimateFaces(video);
      console.log(predictions);
      setFaces(predictions.length);

      //TODO: figure out drawing around face etc.
      // const ctx = canvasRef.current.getContext('2d');
      // for (let i = 0; i < predictions.length; i++) {
      //   const start = predictions[i].topLeft;
      //   const end = predictions[i].bottomRight;
      //   const size = [end[0] - start[0], end[1] - start[1]];
      //   ctx.fillRect(start[0], start[1], size[0], size[1]);
      // }
    }
  };

  useEffect(() => {
    runFaceDetection();
  }, []);

  return (
    <div className="App">
      <h1>Found {faces}</h1>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
      // TODO: Make the button only appear if there is a face found.
      <button onClick={capture}>Capture photo</button>
    </div>
  );
}

export default App;
