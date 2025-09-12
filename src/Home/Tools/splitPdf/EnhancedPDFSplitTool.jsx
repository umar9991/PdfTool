import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Upload, Cloud, CheckCircle, Loader, X, Download, 
  AlertCircle, FileText, Scissors, Settings, Info
} from 'lucide-react';

const EnhancedPDFSplitTool = ({ onBack }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [splitType, setSplitType] = useState('individual');
  const [splitOptions, setSplitOptions] = useState({
    selectedPages: '',
    numberOfParts: 2,
    chunkSize: 2
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [processResult, setProcessResult] = useState(null);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const splitTypes = [
    {
      id: 'individual',
      title: 'Individual Pages',
      description: 'Split each page into separate PDF files',
      icon: '📄',
      example: 'A 5-page PDF → 5 separate files'
    },
    {
      id: 'selected',
      title: 'Selected Pages',
      description: 'Extract specific pages into a new PDF',
      icon: '🎯',
      example: 'Pages 1,3-5,7 → Single PDF with those pages'
    },
    {
      id: 'equal',
      title: 'Equal Parts',
      description: 'Split into equal number of parts',
      icon: '⚖️',
      example: '10-page PDF into 3 parts → 4,3,3 pages each'
    },
    {
      id: 'chunk',
      title: 'Custom Chunks',
      description: 'Split by specific number of pages',
      icon: '📊',
      example: '9-page PDF, chunk size 3 → 3 files (3 pages each)'
    }
  ];

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSetFile(file);
  };

  // Validate file before setting
  const validateAndSetFile = (file) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only');
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File size must be less than 50MB');
      return;
    }
    
    setError(null);
    setUploadedFile(file);
    setProcessResult(null);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  // Process PDF split
  const processPDFSplit = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    setError(null);
    setProcessResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('splitType', splitType);
      
      // Add type-specific parameters
      switch (splitType) {
        case 'selected':
          if (!splitOptions.selectedPages.trim()) {
            throw new Error('Please specify pages to extract (e.g., 1,3-5,7)');
          }
          formData.append('pages', splitOptions.selectedPages.trim());
          break;
        case 'equal':
          formData.append('parts', splitOptions.numberOfParts.toString());
          break;
        case 'chunk':
          formData.append('chunkSize', splitOptions.chunkSize.toString());
          break;
      }
      
      const response = await fetch('http://localhost:3001/api/pdf/split', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${response.status}`);
      }
      
      // Get the processed file
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      // Get filename from response headers
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `split-pdf-${Date.now()}.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) filename = filenameMatch[1];
      }
      
      setProcessResult({
        downloadUrl,
        filename,
        fileType: blob.type
      });
      
    } catch (err) {
      console.error('Error processing PDF:', err);
      setError(err.message || 'An error occurred while processing your PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download processed file
  const downloadFile = () => {
    if (!processResult) return;
    
    const a = document.createElement('a');
    a.href = processResult.downloadUrl;
    a.download = processResult.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setTimeout(() => URL.revokeObjectURL(processResult.downloadUrl), 100);
  };

  // Reset state
  const resetState = () => {
    setUploadedFile(null);
    setProcessResult(null);
    setError(null);
    setSplitOptions({
      selectedPages: '',
      numberOfParts: 2,
      chunkSize: 2
    });
    if (processResult?.downloadUrl) {
      URL.revokeObjectURL(processResult.downloadUrl);
    }
  };

  const currentSplitType = splitTypes.find(type => type.id === splitType);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-red-600 font-medium mb-6 hover:text-red-700 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to All Tools
        </button>
        
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg mb-4">
            <Scissors className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Split PDF</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Separate one page or a whole set for targeted use
          </p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Error Display */}
        {error && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Success Display */}
        {processResult && (
          <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <p className="text-green-700 font-medium">PDF split successfully!</p>
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
              Your PDF has been split using the {currentSplitType?.title} method.
            </p>
          </div>
        )}

        {/* Upload Section */}
        {!uploadedFile && !processResult && (
          <div className="p-8">
            <div 
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive 
                  ? 'border-purple-400 bg-purple-50 scale-105' 
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('pdf-upload').click()}
            >
              <div className={`transition-all duration-300 ${isDragActive ? 'scale-110' : ''}`}>
                <Cloud className={`w-16 h-16 mx-auto mb-4 ${isDragActive ? 'text-purple-500' : 'text-gray-400'}`} />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {isDragActive ? 'Drop your PDF here!' : 'Upload your PDF'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag & drop your PDF file here, or click to select
                </p>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                  Select PDF File
                </div>
                <p className="text-xs text-gray-500 mt-2">Maximum file size: 50MB</p>
              </div>
              <input 
                id="pdf-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}

        {/* File Preview & Split Options */}
        {uploadedFile && !processResult && (
          <div className="p-8">
            {/* File Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-purple-600" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{uploadedFile.name}</h3>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={resetState}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Split Type Selection */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Split Method</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {splitTypes.map(type => (
                  <div
                    key={type.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      splitType === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSplitType(type.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{type.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <p className="text-xs text-gray-500 italic">{type.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Options */}
            <div className="mb-6">
              {splitType === 'selected' && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">
                      Pages to extract (e.g., 1,3-5,7)
                    </span>
                    <input
                      type="text"
                      value={splitOptions.selectedPages}
                      onChange={(e) => setSplitOptions(prev => ({...prev, selectedPages: e.target.value}))}
                      placeholder="1,3-5,7"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </label>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">How to specify pages:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Single pages: 1,3,5</li>
                          <li>• Page ranges: 2-5 (pages 2,3,4,5)</li>
                          <li>• Combined: 1,3-5,8,10-12</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {splitType === 'equal' && (
                <div>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">
                      Number of parts
                    </span>
                    <select
                      value={splitOptions.numberOfParts}
                      onChange={(e) => setSplitOptions(prev => ({...prev, numberOfParts: parseInt(e.target.value)}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {[2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} parts</option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {splitType === 'chunk' && (
                <div>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">
                      Pages per chunk
                    </span>
                    <select
                      value={splitOptions.chunkSize}
                      onChange={(e) => setSplitOptions(prev => ({...prev, chunkSize: parseInt(e.target.value)}))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} page{num > 1 ? 's' : ''} per chunk</option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
            </div>

            {/* Process Button */}
            <button
              onClick={processPDFSplit}
              disabled={isProcessing || (splitType === 'selected' && !splitOptions.selectedPages.trim())}
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
                isProcessing || (splitType === 'selected' && !splitOptions.selectedPages.trim())
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin -ml-1 mr-3 h-6 w-6" />
                  Splitting PDF...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Scissors className="w-5 h-5 mr-2" />
                  Split PDF ({currentSplitType?.title})
                </span>
              )}
            </button>
          </div>
        )}

        {/* Process Another File */}
        {processResult && (
          <div className="p-6 border-t border-gray-200 text-center">
            <button
              onClick={resetState}
              className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200"
            >
              Split another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedPDFSplitTool;