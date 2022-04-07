import React, { useRef } from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import * as blazeface from '@tensorflow-models/blazeface';

function App() {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
  }; // const capture = () => {

  const runFaceDetection = async () => {
    const model = await blazeface.load();
  }


  return (
    <div className="App">
      <h1>Let's find some face(s)</h1>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          audio={false}
          height={480}
          width={640}
          screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capture photo</button>
      </header>
    </div>
  );
}

export default App;
