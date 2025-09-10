import React, { useState, useRef } from 'react';

// PDFUtils component
const PDFUtils = () => {
  const [activeTool, setActiveTool] = useState('merge-pdf');
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);
  const fileInputRef = useRef(null);

  // Initialize PDF.js worker
  const initializePDFJS = () => {
    if (typeof window !== 'undefined' && window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }
  };

  // Create a download link for processed files
  const createDownloadLink = (data, filename, type = 'application/pdf') => {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    
    return {
      url,
      filename,
      type,
      element: (
        <a
          href={url}
          download={filename}
          className="block bg-green-500 text-white text-center p-3 rounded-md no-underline mb-2 font-bold"
          onClick={() => setTimeout(() => URL.revokeObjectURL(url), 100)}
        >
          Download {filename}
        </a>
      )
    };
  };

  // Show error message
  const showError = (message) => {
    alert(`Error: ${message}`);
  };

  // Parse page ranges (e.g., "1-3, 5, 7-9")
  const parsePageRanges = (rangesString, totalPages) => {
    const pages = new Set();
    const ranges = rangesString.split(',');
    
    for (const range of ranges) {
      const trimmedRange = range.trim();
      if (trimmedRange.includes('-')) {
        const [start, end] = trimmedRange.split('-').map(num => parseInt(num.trim()));
        if (start && end && start <= end && start > 0 && end <= totalPages) {
          for (let i = start; i <= end; i++) {
            pages.add(i - 1); // Convert to 0-based index
          }
        }
      } else {
        const pageNum = parseInt(trimmedRange);
        if (pageNum > 0 && pageNum <= totalPages) {
          pages.add(pageNum - 1); // Convert to 0-based index
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  // Handle tool change
  const handleToolChange = (tool) => {
    setActiveTool(tool);
    setFiles([]);
    setDownloadLinks([]);
  };

  // Process files based on selected tool
  const processFiles = async () => {
    if (files.length === 0) {
      showError('Please select files first');
      return;
    }

    setProcessing(true);
    setDownloadLinks([]);

    try {
      // Load required libraries
      if (!window.PDFLib || !window.pdfjsLib) {
        // Dynamically load libraries if not available
        await loadLibraries();
      }

      // Process based on active tool
      await toolImplementations[activeTool].process(
        files, 
        setDownloadLinks, 
        setProcessingText,
        createDownloadLink,
        parsePageRanges,
        showError
      );
    } catch (error) {
      showError(error.message);
    } finally {
      setProcessing(false);
      setProcessingText('');
    }
  };

  // Load required libraries
  const loadLibraries = () => {
    return new Promise((resolve, reject) => {
      // Check if libraries are already loaded
      if (window.PDFLib && window.pdfjsLib) {
        resolve();
        return;
      }

      // Load PDF-Lib
      const pdfLibScript = document.createElement('script');
      pdfLibScript.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
      pdfLibScript.onload = () => {
        // Load PDF.js
        const pdfjsScript = document.createElement('script');
        pdfjsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
        pdfjsScript.onload = () => {
          initializePDFJS();
          resolve();
        };
        pdfjsScript.onerror = () => reject(new Error('Failed to load PDF.js'));
        document.head.appendChild(pdfjsScript);
      };
      pdfLibScript.onerror = () => reject(new Error('Failed to load PDF-Lib'));
      document.head.appendChild(pdfLibScript);
    });
  };

  // Tool implementations
  const toolImplementations = {
    'merge-pdf': {
      title: 'Merge PDF',
      desc: 'Combine PDFs in the order you want with our free online tool.',
      fileType: '.pdf',
      multiple: true,
      options: null,
      process: async (files, setDownloadLinks, setProcessingText, createDownloadLink) => {
        if (!window.PDFLib) {
          throw new Error('PDF-lib library not loaded');
        }
        
        setProcessingText('Merging PDFs...');
        const { PDFDocument } = window.PDFLib;
        const mergedPdf = await PDFDocument.create();
        
        for (let i = 0; i < files.length; i++) {
          setProcessingText(`Processing file ${i + 1}/${files.length}`);
          const pdfBytes = await files[i].arrayBuffer();
          const pdfDoc = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        const link = createDownloadLink(mergedPdfBytes, 'merged.pdf');
        setDownloadLinks([link]);
      }
    },

    'split-pdf': {
      title: 'Split PDF',
      desc: 'Separate one page or a whole set for easy conversion into independent PDF files.',
      fileType: '.pdf',
      multiple: false,
      options: ({ rangesInput, setRangesInput }) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page ranges (e.g., 1-3, 5, 7-9):
          </label>
          <input 
            type="text" 
            value={rangesInput}
            onChange={(e) => setRangesInput(e.target.value)}
            placeholder="e.g., 1-3, 5, 7-9" 
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-sm text-gray-600 mt-2">
            Enter specific pages or ranges separated by commas
          </p>
        </div>
      ),
      process: async (files, setDownloadLinks, setProcessingText, createDownloadLink, parsePageRanges, showError, rangesInput) => {
        if (!window.PDFLib) {
          throw new Error('PDF-lib library not loaded');
        }

        if (!rangesInput) {
          throw new Error('Please specify page ranges');
        }

        setProcessingText('Loading PDF...');
        const { PDFDocument } = window.PDFLib;
        const pdfBytes = await files[0].arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();
        
        const pagesToExtract = parsePageRanges(rangesInput, totalPages);
        
        if (pagesToExtract.length === 0) {
          throw new Error('No valid pages found in the specified ranges');
        }

        setProcessingText('Splitting PDF...');
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract);
        copiedPages.forEach(page => newPdf.addPage(page));
        
        const newPdfBytes = await newPdf.save();
        const link = createDownloadLink(
          newPdfBytes, 
          `split-pages-${pagesToExtract.map(p => p + 1).join('-')}.pdf`
        );
        setDownloadLinks([link]);
      }
    },

    'compress-pdf': {
      title: 'Compress PDF',
      desc: 'Reduce file size while optimizing for maximal PDF quality.',
      fileType: '.pdf',
      multiple: false,
      options: ({ compressionLevel, setCompressionLevel }) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compression Level:
          </label>
          <select 
            value={compressionLevel} 
            onChange={(e) => setCompressionLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="high">High Compression (Smaller file, lower quality)</option>
            <option value="medium">Medium Compression (Balanced)</option>
            <option value="low">Low Compression (Better quality, larger file)</option>
          </select>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              Note: This is a simplified compression. For better results, consider using server-side processing.
            </p>
          </div>
        </div>
      ),
      process: async (files, setDownloadLinks, setProcessingText, createDownloadLink) => {
        if (!window.PDFLib) {
          throw new Error('PDF-lib library not loaded');
        }

        setProcessingText('Compressing PDF...');
        const { PDFDocument } = window.PDFLib;
        
        // Simple compression by re-saving the PDF
        const pdfBytes = await files[0].arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        // Basic compression by re-saving
        const compressedPdfBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false
        });
        
        const originalSize = files[0].size;
        const compressedSize = compressedPdfBytes.length;
        const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
        
        const link = createDownloadLink(compressedPdfBytes, 'compressed.pdf');
        setDownloadLinks([link]);
        
        // Create info element
        const infoElement = (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-medium text-green-800">Compression Results:</h4>
            <p className="text-sm text-green-700">Original size: {(originalSize / 1024 / 1024).toFixed(2)} MB</p>
            <p className="text-sm text-green-700">Compressed size: {(compressedSize / 1024 / 1024).toFixed(2)} MB</p>
            <p className="text-sm text-green-700">Space saved: {compressionRatio}%</p>
          </div>
        );
        
        setDownloadLinks(prev => [...prev, { element: infoElement }]);
      }
    },

    'pdf-to-word': {
      title: 'PDF to Word',
      desc: 'Easily convert PDF files to Word documents that you can edit.',
      fileType: '.pdf',
      multiple: false,
      options: () => (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            This tool extracts text from PDF files. For better formatting preservation, 
            consider using dedicated PDF to Word conversion services.
          </p>
        </div>
      ),
      process: async (files, setDownloadLinks, setProcessingText, createDownloadLink) => {
        if (!window.pdfjsLib) {
          throw new Error('PDF.js library not loaded');
        }

        setProcessingText('Extracting text from PDF...');
        const pdfData = await files[0].arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: pdfData }).promise;
        
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          setProcessingText(`Processing page ${i}/${pdf.numPages}`);
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += `\n\n--- Page ${i} ---\n\n${pageText}`;
        }
        
        const link = createDownloadLink(
          new Blob([fullText], { type: 'text/plain' }), 
          'extracted-text.txt',
          'text/plain'
        );
        setDownloadLinks([link]);
      }
    },

    'jpg-to-pdf': {
      title: 'JPG to PDF',
      desc: 'Convert JPG images to PDF format.',
      fileType: 'image/jpeg,image/png,image/webp',
      multiple: true,
      options: ({ pageSize, setPageSize }) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Size:
          </label>
          <select 
            value={pageSize} 
            onChange={(e) => setPageSize(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="fit">Fit to Image Size</option>
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
          </select>
        </div>
      ),
      process: async (files, setDownloadLinks, setProcessingText, createDownloadLink, parsePageRanges, showError, pageSize) => {
        if (!window.PDFLib) {
          throw new Error('PDF-lib library not loaded');
        }

        setProcessingText('Creating PDF from images...');
        const { PDFDocument } = window.PDFLib;
        const pdfDoc = await PDFDocument.create();
        
        for (let i = 0; i < files.length; i++) {
          setProcessingText(`Processing image ${i + 1}/${files.length}`);
          const imageBytes = await files[i].arrayBuffer();
          
          let image;
          if (files[i].type === 'image/png') {
            image = await pdfDoc.embedPng(imageBytes);
          } else {
            // Convert to JPG if needed
            image = await pdfDoc.embedJpg(imageBytes);
          }
          
          let page;
          if (pageSize === 'fit') {
            page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, {
              x: 0,
              y: 0,
              width: image.width,
              height: image.height
            });
          } else {
            // Standard page sizes
            const pageSizes = {
              a4: [595, 842],
              letter: [612, 792],
              legal: [612, 1008]
            };
            
            page = pdfDoc.addPage(pageSizes[pageSize]);
            const pageWidth = pageSizes[pageSize][0];
            const pageHeight = pageSizes[pageSize][1];
            
            // Calculate scaling to fit image on page
            const scaleX = pageWidth / image.width;
            const scaleY = pageHeight / image.height;
            const scale = Math.min(scaleX, scaleY) * 0.9; // 90% of page for margins
            
            const scaledWidth = image.width * scale;
            const scaledHeight = image.height * scale;
            
            // Center the image
            const x = (pageWidth - scaledWidth) / 2;
            const y = (pageHeight - scaledHeight) / 2;
            
            page.drawImage(image, {
              x: x,
              y: y,
              width: scaledWidth,
              height: scaledHeight
            });
          }
        }
        
        const pdfBytes = await pdfDoc.save();
        const link = createDownloadLink(pdfBytes, 'images-to-pdf.pdf');
        setDownloadLinks([link]);
      }
    },

    'watermark-pdf': {
      title: 'Watermark PDF',
      desc: 'Stamp an image or text over your PDF in seconds.',
      fileType: '.pdf',
      multiple: false,
      options: ({ watermarkText, setWatermarkText, opacity, setOpacity, position, setPosition }) => (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text:</label>
            <input 
              type="text" 
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opacity: <span>{opacity}</span>
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.1" 
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position:</label>
            <select 
              value={position} 
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="center">Center</option>
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>
        </div>
      ),
      process: async (files, setDownloadLinks, setProcessingText, createDownloadLink, parsePageRanges, showError, watermarkText, opacity, position) => {
        if (!window.PDFLib) {
          throw new Error('PDF-lib library not loaded');
        }

        setProcessingText('Adding watermark to PDF...');
        const { PDFDocument, rgb } = window.PDFLib;
        const pdfBytes = await files[0].arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(PDFDocument.Font.HelveticaBold);
        
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const { width, height } = page.getSize();
          
          let x, y;
          switch (position) {
            case 'top-left':
              x = width * 0.1;
              y = height * 0.9;
              break;
            case 'top-right':
              x = width * 0.7;
              y = height * 0.9;
              break;
            case 'bottom-left':
              x = width * 0.1;
              y = height * 0.1;
              break;
            case 'bottom-right':
              x = width * 0.7;
              y = height * 0.1;
              break;
            default: // center
              x = width / 2 - 50;
              y = height / 2;
          }
          
          page.drawText(watermarkText, {
            x,
            y,
            font,
            size: 40,
            color: rgb(0.5, 0.5, 0.5),
            opacity: parseFloat(opacity),
            rotate: PDFDocument.degrees(-45)
          });
        }
        
        const watermarkedPdfBytes = await pdfDoc.save();
        const link = createDownloadLink(watermarkedPdfBytes, 'watermarked.pdf');
        setDownloadLinks([link]);
      }
    }
  };

  // State for tool-specific options
  const [rangesInput, setRangesInput] = useState('');
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [pageSize, setPageSize] = useState('a4');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [position, setPosition] = useState('center');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">PDF Utilities</h1>
        
        {/* Tool Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(toolImplementations).map(([key, tool]) => (
            <button
              key={key}
              onClick={() => handleToolChange(key)}
              className={`p-4 rounded-lg text-center transition-colors ${
                activeTool === key 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <h3 className="font-semibold">{tool.title}</h3>
              <p className="text-xs mt-2">{tool.desc}</p>
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload {toolImplementations[activeTool].multiple ? 'Files' : 'File'}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={toolImplementations[activeTool].fileType}
              multiple={toolImplementations[activeTool].multiple}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              {files.length > 0 
                ? `${files.length} file(s) selected` 
                : 'No files selected'}
            </p>
          </div>
          
          {/* Tool Options */}
          {toolImplementations[activeTool].options && (
            <div className="mb-6">
              {toolImplementations[activeTool].options({
                rangesInput, setRangesInput,
                compressionLevel, setCompressionLevel,
                pageSize, setPageSize,
                watermarkText, setWatermarkText,
                opacity, setOpacity,
                position, setPosition
              })}
            </div>
          )}
          
          {/* Process Button */}
          <button
            onClick={processFiles}
            disabled={processing || files.length === 0}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? processingText : `Process ${toolImplementations[activeTool].title}`}
          </button>
          
          {/* Download Links */}
          {downloadLinks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Download Results:</h3>
              {downloadLinks.map((link, index) => (
                <div key={index}>{link.element || link}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFUtils;