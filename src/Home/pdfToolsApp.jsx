import React, { useState } from 'react';

// Main App Component
const PDFToolsApp = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // PDF Tools Data
  const pdfTools = [
    {
      id: 'merge-pdf',
      title: 'Merge PDF',
      description: 'Combine PDFs in the order you want...',
      icon: '📄',
    },
    {
      id: 'split-pdf',
      title: 'Split PDF',
      description: 'Separate one page or a whole set...',
      icon: '✂️',
    },
    {
      id: 'compress-pdf',
      title: 'Compress PDF',
      description: 'Reduce file size...',
      icon: '📦',
    },
    {
      id: 'pdf-to-word',
      title: 'PDF to Word',
      description: 'Convert PDF to editable DOCX...',
      icon: '📝',
    },
    {
      id: 'pdf-to-powerpoint',
      title: 'PDF to PowerPoint',
      description: 'Turn PDF into PPTX slideshows.',
      icon: '📊',
    },
    {
      id: 'pdf-to-excel',
      title: 'PDF to Excel',
      description: 'Pull data from PDF to Excel.',
      icon: '📈',
    },
    {
      id: 'word-to-pdf',
      title: 'Word to PDF',
      description: 'Convert DOCX to PDF.',
      icon: '📄',
    },
    {
      id: 'powerpoint-to-pdf',
      title: 'PowerPoint to PDF',
      description: 'Convert PPTX to PDF.',
      icon: '📄',
    },
    {
      id: 'excel-to-pdf',
      title: 'Excel to PDF',
      description: 'Convert XLSX to PDF.',
      icon: '📄',
    },
    {
      id: 'edit-pdf',
      title: 'Edit PDF',
      description: 'Add text, images, and shapes.',
      icon: '✏️',
    },
    {
      id: 'pdf-to-jpg',
      title: 'PDF to JPG',
      description: 'Convert each PDF page into a JPG.',
      icon: '🖼️',
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG to PDF',
      description: 'Convert JPG images to PDF.',
      icon: '📄',
    },
    {
      id: 'sign-pdf',
      title: 'Sign PDF',
      description: 'Sign yourself or request signatures.',
      icon: '✍️',
    },
    {
      id: 'watermark',
      title: 'Watermark',
      description: 'Stamp an image or text over your PDF.',
      icon: '💧',
    },
    {
      id: 'rotate-pdf',
      title: 'Rotate PDF',
      description: 'Rotate your PDFs the way you need them.',
      icon: '🔄',
    },
  ];

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(files);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Process files (to be integrated with your backend)
  const processFiles = async () => {
    setIsProcessing(true);
    
    // Here you would integrate with your backend API
    try {
      // Example API call
      /*
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('tool', activeTool);
      
      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      // Handle result from backend
      */
      
      // Simulate processing delay
      setTimeout(() => {
        setIsProcessing(false);
        alert(`Processing complete with ${uploadedFiles.length} files for ${activeTool}`);
      }, 2000);
    } catch (error) {
      console.error('Error processing files:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-red-600 font-bold text-xl md:text-2xl">
                Best PDF Tool
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">AllTools</a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">About Us</a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Contact Us</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!activeTool ? (
          // Tools Grid View
          <>
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">All PDF Tools</h1>
            <p className="text-center text-gray-600 mb-8">Convert, compress, and edit your PDF files with our online tools</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pdfTools.map(tool => (
                <div 
                  key={tool.id}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                  onClick={() => setActiveTool(tool.id)}
                >
                  <div className="text-3xl mb-4">{tool.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button 
              onClick={() => setActiveTool(null)}
              className="flex items-center text-red-600 font-medium mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Tools
            </button>
            
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              {pdfTools.find(tool => tool.id === activeTool)?.title}
            </h1>
            <p className="text-gray-600 mb-8">
              {pdfTools.find(tool => tool.id === activeTool)?.description}
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-6"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-700 mb-1">Drag & drop files here, or</p>
                <p className="text-red-600 font-medium">Select Files</p>
                <input 
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Selected Files:</h3>
                  <ul className="bg-gray-50 rounded-md p-3">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 mb-1">
                        <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <hr className="my-6" />
              
              <button
                onClick={processFiles}
                disabled={uploadedFiles.length === 0 || isProcessing}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  uploadedFiles.length === 0 || isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Process'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFToolsApp;