import React, {useRef} from 'react'
import './App.css'
import * as tf from "tfjs"
import Webcam from "react-webcam"

function App() {
  const webcamRef = useRef(null)

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    console.log(imageSrc)
  }   // const capture = () => {                                                                                                                                                                                                          
 
  return (
    <div className="App">
      <h1>Let's find some face(s)</h1>
      <header className="App-header">
        <Webcam ref={webcamRef} audio={false} height={350} width={350} screenshotFormat="image/jpeg" />
        <button onClick={capture}>Capture photo</button>
      </header>
    </div>
  )
}

export default App
