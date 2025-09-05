import React from 'react'
import './App.css'
import Navbar from './Home/pages/Navbar'
import PDFUtils from './Home/pdf/pdfUtils'
import HeroSection from './Home/heroSection/HeroSection'

function App() {

  return (
    <>
    <Navbar/>
    <HeroSection/>
  
    <PDFUtils/>
    {/* <ToolCard tool={toolData} onClick={handleClick} /> */}

    </>
  )
}

export default App
