import React from 'react'
import './App.css'
import Navbar from './Home/pages/Navbar'
import PDFUtils from './Home/pdf/pdfUtils'
import HeroSection from './Home/heroSection/HeroSection'
import PDFToolsApp from './Home/pdfToolsApp'
import Footer from './Home/pages/Footer'
import Content from './Home/pages/content'
import PDFToolsLanding from './Home/pages/PDFToolsLanding'

function App() {

  return (
    <>
     <Navbar/>
    {/* <Content/> */}
    {/* <HeroSection/> */}
    <PDFToolsApp/>
    <PDFToolsLanding/>
     <Footer/>
     {/*
    <HeroSection/>
  
    <PDFUtils/> */}
    {/* <PDFToolsApp/> */}
    {/* <ToolCard tool={toolData} onClick={handleClick} /> */}

    </>
  )
}

export default App
