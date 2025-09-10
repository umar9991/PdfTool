import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Cloud, FileText, X } from 'lucide-react';
import { useFile } from '../contexts/FileContext';

const FileUpload = ({ accept, multiple = false, maxFiles = 1 }) => {
  const { state, dispatch } = useFile();
  const { files } = state;

  const onDrop = useCallback((acceptedFiles) => {
    dispatch({ type: 'ADD_FILE', payload: acceptedFiles });
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxFiles,
  });

  const removeFile = (index) => {
    dispatch({ type: 'REMOVE_FILE', payload: index });
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
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
            {multiple ? 'Drag & drop files here, or click to select' : 'Click to select a file'}
          </p>
          <div className="inline-flex px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            Select Files
          </div>
        </div>
        <input {...getInputProps()} />
      </div>

      {files.length > 0 && (
        <div className="animate-slide-up">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 text-green-500 mr-2" />
            Selected Files ({files.length})
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
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
                  onClick={() => removeFile(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;