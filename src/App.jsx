import React, {useRef} from 'react'
// import './App.css'
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
      <h1>Hello there World</h1>
    </div>
  )
}

export default App
