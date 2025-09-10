import React, { useState, useEffect } from 'react';
import { 
  GitMerge, Scissors, Archive, FileText, Presentation, 
  FileSpreadsheet, Edit, Image, FileImage, PenTool, 
  Droplets, RotateCw, ArrowLeft, Upload, Cloud, 
  CheckCircle, Loader, X, Download, AlertCircle
} from 'lucide-react';

const PDFToolsApp = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [processResult, setProcessResult] = useState(null);
  const [error, setError] = useState(null);

  // PDF Tools Data with proper icons
  const pdfTools = [
    {
      id: 'merge-pdf',
      title: 'Merge PDF',
      description: 'Combine multiple PDFs in the order you want with ease',
      icon: GitMerge,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      endpoint: '/pdf/merge',
      accept: '.pdf',
      multiple: true
    },
    {
      id: 'split-pdf',
      title: 'Split PDF',
      description: 'Separate one page or a whole set for targeted use',
      icon: Scissors,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      endpoint: '/pdf/split',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'compress-pdf',
      title: 'Compress PDF',
      description: 'Reduce file size while maintaining quality',
      icon: Archive,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      endpoint: '/pdf/compress',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'pdf-to-word',
      title: 'PDF to Word',
      description: 'Convert PDF to editable DOCX format instantly',
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      endpoint: '/convert/pdf-to-word',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'pdf-to-powerpoint',
      title: 'PDF to PowerPoint',
      description: 'Turn PDF into PPTX slideshows effortlessly',
      icon: Presentation,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      endpoint: '/convert/pdf-to-powerpoint',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'pdf-to-excel',
      title: 'PDF to Excel',
      description: 'Extract data from PDF to Excel spreadsheets',
      icon: FileSpreadsheet,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      endpoint: '/convert/pdf-to-excel',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'word-to-pdf',
      title: 'Word to PDF',
      description: 'Convert DOCX documents to PDF format',
      icon: FileText,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      endpoint: '/office/word-to-pdf',
      accept: '.doc,.docx',
      multiple: false
    },
    {
      id: 'powerpoint-to-pdf',
      title: 'PowerPoint to PDF',
      description: 'Convert PPTX presentations to PDF',
      icon: Presentation,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      endpoint: '/office/powerpoint-to-pdf',
      accept: '.ppt,.pptx',
      multiple: false
    },
    {
      id: 'excel-to-pdf',
      title: 'Excel to PDF',
      description: 'Convert XLSX spreadsheets to PDF',
      icon: FileSpreadsheet,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      endpoint: '/office/excel-to-pdf',
      accept: '.xls,.xlsx',
      multiple: false
    },
    {
      id: 'edit-pdf',
      title: 'Edit PDF',
      description: 'Add text, images, and shapes to your PDFs',
      icon: Edit,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      endpoint: '/pdf/edit',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'pdf-to-jpg',
      title: 'PDF to JPG',
      description: 'Convert each PDF page into high-quality JPG images',
      icon: Image,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      endpoint: '/image/pdf-to-jpg',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG to PDF',
      description: 'Convert JPG images to PDF documents',
      icon: FileImage,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      endpoint: '/image/jpg-to-pdf',
      accept: '.jpg,.jpeg,.png',
      multiple: true
    },
    {
      id: 'sign-pdf',
      title: 'Sign PDF',
      description: 'Add digital signatures or request signatures',
      icon: PenTool,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      endpoint: '/pdf/sign',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'watermark-pdf',
      title: 'Watermark PDF',
      description: 'Add image or text watermarks to your PDFs',
      icon: Droplets,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      endpoint: '/pdf/watermark',
      accept: '.pdf',
      multiple: false
    },
    {
      id: 'rotate-pdf',
      title: 'Rotate PDF',
      description: 'Rotate PDF pages to the correct orientation',
      icon: RotateCw,
      color: 'from-lime-500 to-lime-600',
      bgColor: 'bg-lime-50',
      borderColor: 'border-lime-200',
      endpoint: '/pdf/rotate',
      accept: '.pdf',
      multiple: false
    }
  ];

  const currentTool = pdfTools.find(tool => tool.id === activeTool);

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    validateAndSetFiles(files);
  };

  // Validate files before setting them
  const validateAndSetFiles = (files) => {
    if (!currentTool) return;
    
    // Check if multiple files are allowed
    if (!currentTool.multiple && files.length > 1) {
      setError('This tool only supports single file upload');
      return;
    }
    
    // Check file types
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return !currentTool.accept.split(',').includes(extension);
    });
    
    if (invalidFiles.length > 0) {
      setError(`Invalid file type. Please upload only ${currentTool.accept} files`);
      return;
    }
    
    setError(null);
    setUploadedFiles(files);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    validateAndSetFiles(files);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  // Remove file
  const removeFile = (index) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  // Process files by sending to backend
  const processFiles = async () => {
    if (!currentTool || uploadedFiles.length === 0) return;
    
    setIsProcessing(true);
    setError(null);
    setProcessResult(null);
    
    try {
      const formData = new FormData();
      
      // Add files to form data based on tool requirements
      if (currentTool.multiple) {
        // For tools that accept multiple files (like merge)
        uploadedFiles.forEach(file => {
          formData.append('files', file);
        });
      } else {
        // For tools that accept single file
        formData.append('file', uploadedFiles[0]);
      }
      
      // Add tool-specific options if needed
      if (currentTool.id === 'split-pdf') {
        formData.append('pages', JSON.stringify([1])); // Default to first page
      }
      
      // Send request to backend with updated endpoint paths
      const response = await fetch(`http://localhost:3001/api${currentTool.endpoint}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server returned ${response.status}`);
      }
      
      // Get the processed file
      const blob = await response.blob();
      
      // Create a download URL
      const downloadUrl = URL.createObjectURL(blob);
      
      // Get filename from content-disposition header or generate one
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `processed-${currentTool.id}-${Date.now()}`;
      
      // Determine file extension based on tool type
      const fileExtension = currentTool.id.includes('jpg') ? '.zip' : 
                           currentTool.id.includes('word') ? '.docx' :
                           currentTool.id.includes('excel') ? '.xlsx' :
                           currentTool.id.includes('powerpoint') ? '.pptx' : '.pdf';
      
      filename += fileExtension;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) filename = filenameMatch[1];
      }
      
      setProcessResult({
        downloadUrl,
        filename,
        fileType: blob.type
      });
      
    } catch (err) {
      console.error('Error processing files:', err);
      setError(err.message || 'An error occurred while processing your files');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download the processed file
  const downloadFile = () => {
    if (!processResult) return;
    
    const a = document.createElement('a');
    a.href = processResult.downloadUrl;
    a.download = processResult.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up the URL object after download
    setTimeout(() => URL.revokeObjectURL(processResult.downloadUrl), 100);
  };

  // Reset the state when changing tools
  useEffect(() => {
    setUploadedFiles([]);
    setProcessResult(null);
    setError(null);
  }, [activeTool]);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!activeTool ? (
          // Tools Grid View
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                All PDF Tools
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Convert, compress, and edit your PDF files with our powerful online tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {pdfTools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <div 
                    key={tool.id}
                    className={`group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 border ${tool.borderColor} hover:border-opacity-60 animate-slide-up`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setActiveTool(tool.id)}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm font-medium text-blue-600">Try now →</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Tool View
          <div className="animate-fade-in">
            <button 
              onClick={() => setActiveTool(null)}
              className="flex items-center text-red-600 font-medium mb-8 hover:text-red-700 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to All Tools
            </button>
            
            <div className="text-center mb-8">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${currentTool?.color} shadow-lg mb-4`}>
                {currentTool && <currentTool.icon className="w-12 h-12 text-white" />}
              </div>
              <h1 className="text-4xl font-bold mb-2 text-gray-900">
                {currentTool?.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {currentTool?.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Accepts: {currentTool?.accept} files {currentTool?.multiple ? '(Multiple files allowed)' : '(Single file only)'}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
                
                {/* Result Display */}
                {processResult && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <p className="text-green-700 font-medium">Processing complete!</p>
                      </div>
                      <button
                        onClick={downloadFile}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    </div>
                    <p className="text-green-600 text-sm mt-2">
                      Your {currentTool.title} operation was successful. Click download to get your file.
                    </p>
                  </div>
                )}
                
                {/* Upload Area */}
                {!processResult && (
                  <div 
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive 
                        ? 'border-blue-400 bg-blue-50 scale-105' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <div className={`transition-all duration-300 ${isDragActive ? 'scale-110' : ''}`}>
                      <div className="relative mb-6">
                        <Cloud className={`w-16 h-16 mx-auto transition-colors duration-300 ${
                          isDragActive ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                        <Upload className={`w-6 h-6 absolute top-2 right-2 transition-colors duration-300 ${
                          isDragActive ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {isDragActive ? 'Drop files here!' : 'Upload your files'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {currentTool.multiple ? 'Drag & drop files here, or click to select' : 'Click to select a file'}
                      </p>
                      <div className="inline-flex px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Select Files
                      </div>
                    </div>
                    <input 
                      id="file-upload"
                      type="file"
                      multiple={currentTool.multiple}
                      accept={currentTool.accept}
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                )}
                
                {/* File List */}
                {uploadedFiles.length > 0 && !processResult && (
                  <div className="mt-8 animate-slide-up">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Selected Files ({uploadedFiles.length})
                    </h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Button */}
                {!processResult && uploadedFiles.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={processFiles}
                      disabled={isProcessing}
                      className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
                        isProcessing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : `bg-gradient-to-r ${currentTool?.color} hover:scale-105 shadow-lg hover:shadow-xl`
                      }`}
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <Loader className="animate-spin -ml-1 mr-3 h-6 w-6" />
                          Processing your files...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Download className="w-5 h-5 mr-2" />
                          Process {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </button>
                  </div>
                )}
                
                {/* Start Over Button */}
                {processResult && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setProcessResult(null);
                        setUploadedFiles([]);
                        if (processResult.downloadUrl) {
                          URL.revokeObjectURL(processResult.downloadUrl);
                        }
                      }}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                    >
                      Process another file
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFToolsApp;