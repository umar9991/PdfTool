import React from 'react'
import './App.css'
import Navbar from './Home/pages/Navbar'
import PDFToolsApp from './Home/pdfToolsApp'
import Footer from './Home/pages/Footer'
import EnhancedPDFSplitTool from './Home/Tools/splitPdf/EnhancedPDFSplitTool'

function App() {
  return (
    <>
    {/* // test commit */}
      <Navbar/>
      {/* <PDFToolsApp/> */}
      <EnhancedPDFSplitTool/>
      <Footer/>
    </>
  )
}

export default App