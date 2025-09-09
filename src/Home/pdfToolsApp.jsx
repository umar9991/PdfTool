import React, { useState } from 'react';
import { 
  GitMerge, Scissors, Archive, FileText, Presentation, 
  FileSpreadsheet, Edit, Image, FileImage, PenTool, 
  Droplets, RotateCw, ArrowLeft, Upload, Cloud, 
  CheckCircle, Loader, X, Download
} from 'lucide-react';

const PDFToolsApp = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

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
    },
    {
      id: 'split-pdf',
      title: 'Split PDF',
      description: 'Separate one page or a whole set for targeted use',
      icon: Scissors,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      id: 'compress-pdf',
      title: 'Compress PDF',
      description: 'Reduce file size while maintaining quality',
      icon: Archive,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      id: 'pdf-to-word',
      title: 'PDF to Word',
      description: 'Convert PDF to editable DOCX format instantly',
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
    {
      id: 'pdf-to-powerpoint',
      title: 'PDF to PowerPoint',
      description: 'Turn PDF into PPTX slideshows effortlessly',
      icon: Presentation,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      id: 'pdf-to-excel',
      title: 'PDF to Excel',
      description: 'Extract data from PDF to Excel spreadsheets',
      icon: FileSpreadsheet,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'word-to-pdf',
      title: 'Word to PDF',
      description: 'Convert DOCX documents to PDF format',
      icon: FileText,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
    },
    {
      id: 'powerpoint-to-pdf',
      title: 'PowerPoint to PDF',
      description: 'Convert PPTX presentations to PDF',
      icon: Presentation,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
    },
    {
      id: 'excel-to-pdf',
      title: 'Excel to PDF',
      description: 'Convert XLSX spreadsheets to PDF',
      icon: FileSpreadsheet,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      id: 'edit-pdf',
      title: 'Edit PDF',
      description: 'Add text, images, and shapes to your PDFs',
      icon: Edit,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      id: 'pdf-to-jpg',
      title: 'PDF to JPG',
      description: 'Convert each PDF page into high-quality JPG images',
      icon: Image,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG to PDF',
      description: 'Convert JPG images to PDF documents',
      icon: FileImage,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'sign-pdf',
      title: 'Sign PDF',
      description: 'Add digital signatures or request signatures',
      icon: PenTool,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    },
    {
      id: 'watermark',
      title: 'Watermark',
      description: 'Add image or text watermarks to your PDFs',
      icon: Droplets,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
    },
    {
      id: 'rotate-pdf',
      title: 'Rotate PDF',
      description: 'Rotate PDF pages to the correct orientation',
      icon: RotateCw,
      color: 'from-lime-500 to-lime-600',
      bgColor: 'bg-lime-50',
      borderColor: 'border-lime-200',
    },
  ];

  const currentTool = pdfTools.find(tool => tool.id === activeTool);

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(files);
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

  // Process files
  const processFiles = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate processing delay
      setTimeout(() => {
        setIsProcessing(false);
        alert(`Processing complete! ${uploadedFiles.length} file(s) processed using ${currentTool?.title}`);
      }, 2000);
    } catch (error) {
      console.error('Error processing files:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!activeTool ? (
          // Enhanced Tools Grid View
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
          // Enhanced Tool View
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
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                {/* Enhanced Upload Area */}
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
                    <p className="text-gray-600 mb-4">Drag & drop files here, or click to select</p>
                    <div className="inline-flex px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Select Files
                    </div>
                  </div>
                  <input 
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
                
                {/* Enhanced File List */}
                {uploadedFiles.length > 0 && (
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
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={processFiles}
                    disabled={uploadedFiles.length === 0 || isProcessing}
                    className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
                      uploadedFiles.length === 0 || isProcessing
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
                        Process {uploadedFiles.length > 0 ? `${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''}` : 'Files'}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default PDFToolsApp;