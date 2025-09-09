import React from 'react';
import { FileText, GitMerge, Scissors, Archive, Edit, Lock, Unlock, Image, FileImage, Shield, Zap, Globe, Users } from 'lucide-react';

const PDFToolsLanding = () => {
  const coreTools = [
    {
      icon: <GitMerge className="w-8 h-8" />,
      title: "Merge PDF",
      description: "Combine multiple PDF files into one single, organized document. Perfect for creating reports, presentations, or portfolios."
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Split PDF", 
      description: "Extract specific pages or page ranges from a large PDF. Easily create smaller, more focused documents or separate chapters from a book."
    },
    {
      icon: <Archive className="w-8 h-8" />,
      title: "Compress PDF",
      description: "Drastically reduce the file size of your PDFs without a noticeable loss in quality. Perfect for sharing via email or uploading to the web."
    },
    {
      icon: <Edit className="w-8 h-8" />,
      title: "Organize PDF",
      description: "Take full control. Our intuitive interface lets you reorder, rotate, and delete pages within your PDF file."
    }
  ];

  const convertFromPdf = [
    { title: "PDF to Word", description: "Convert your PDF into an editable DOCX file, preserving as much layout as possible." },
    { title: "PDF to Excel", description: "Extract tables from your PDF directly into a fully functional Excel spreadsheet." },
    { title: "PDF to PowerPoint", description: "Transform each page of your PDF into an editable slide in a PPTX presentation." },
    { title: "PDF to JPG", description: "Convert PDF pages into high-quality JPG images, perfect for web use." }
  ];

  const convertToPdf = [
    { title: "Word to PDF", description: "Convert your DOCX files into professional, un-editable PDFs." },
    { title: "Excel to PDF", description: "Turn your spreadsheets and charts into a clean, shareable PDF document." },
    { title: "PowerPoint to PDF", description: "Archive your presentations or make them easy to share." },
    { title: "JPG to PDF", description: "Combine multiple images into a single, easy-to-share PDF file." },
    { title: "HTML to PDF", description: "Convert any webpage into a PDF for offline reading or archiving." }
  ];

  const advancedFeatures = [
    { icon: <Edit className="w-6 h-6" />, title: "Edit PDF", description: "Add text, insert images, draw shapes, and highlight content directly onto your PDF." },
    { icon: <FileText className="w-6 h-6" />, title: "Sign PDF", description: "Apply a legally binding electronic signature to your documents." },
    { icon: <Image className="w-6 h-6" />, title: "Watermark PDF", description: "Protect your intellectual property by adding a text or image watermark." },
    { icon: <Lock className="w-6 h-6" />, title: "Protect PDF", description: "Add a strong password to encrypt your PDF, preventing unauthorized access." },
    { icon: <Unlock className="w-6 h-6" />, title: "Unlock PDF", description: "Remove a password from a PDF file (provided you have the right to do so)." },
    { icon: <Shield className="w-6 h-6" />, title: "Redact PDF", description: "Permanently black out and remove sensitive text or images from a document." }
  ];

  const advantages = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "100% Free and Online",
      description: "Every PDF tool on our site is completely free to use. No hidden fees, subscriptions, or sign-ups required."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Client-Side Security", 
      description: "All file processing happens directly in your browser. Your files never leave your device, ensuring 100% privacy."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "No Installation Needed",
      description: "Fully online platform that works in any browser. Always have access to the latest version of our tools."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Friendly Interface",
      description: "Clean, intuitive design ensures anyone can use our tools with just a few clicks."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
            <FileText className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
            Best PDF Tools
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            The Ultimate Free Online PDF Tool for All Your Needs
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            In today's digital world, the Portable Document Format (PDF) is the undisputed king of document sharing. 
            We provide a comprehensive suite of powerful, <span className="font-semibold text-blue-600">free online PDF tools</span> designed 
            to make your document management seamless, secure, and incredibly efficient.
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-16 shadow-xl border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Why a Powerful, All-in-One PDF Tool is Essential
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto text-center">
            Managing digital documents is a core part of modern productivity. You might need to merge PDF files from different 
            departments into a single report, or split PDF pages from a large manual. Perhaps you need to compress PDF files 
            to meet email attachment size limits, or convert PDF to Word for easy editing. Our platform eliminates these 
            roadblocks by offering every function in one convenient place.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Master Your Documents with Our Core PDF Tools
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our suite is built around the most common PDF tasks, refined for maximum ease of use.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTools.map((tool, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/30">
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Seamlessly Convert Files with Our Powerful PDF Converters
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
            File format incompatibility is a thing of the past. Our robust conversion engine handles a wide array of formats with precision.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Convert FROM PDF */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-red-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                Convert FROM PDF
              </h3>
              <p className="text-gray-700 mb-6">Unlock the content within your PDFs with our leading conversion tools.</p>
              <div className="space-y-4">
                {convertFromPdf.map((tool, index) => (
                  <div key={index} className="bg-white/70 rounded-lg p-4 hover:bg-white/90 transition-colors duration-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{tool.title}</h4>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <FileImage className="w-4 h-4 text-white" />
                </div>
                Convert TO PDF
              </h3>
              <p className="text-gray-700 mb-6">The PDF format ensures your document looks the same on any device.</p>
              <div className="space-y-4">
                {convertToPdf.map((tool, index) => (
                  <div key={index} className="bg-white/70 rounded-lg p-4 hover:bg-white/90 transition-colors duration-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{tool.title}</h4>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Advanced Editing and Security
          </h2>
          <p className="text-lg text-gray-600 text-center mb-4">
            The Best Free PDF Editor Online
          </p>
          <p className="text-gray-600 text-center mb-12 max-w-4xl mx-auto">
            Go beyond basic management with our advanced features. We provide a free PDF editor that rivals paid software, 
            all while prioritizing your security.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
                <div className="text-purple-600 mb-3">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            The Best PDF Tools Advantage
          </h2>
          <p className="text-lg text-gray-600 text-center mb-4">
            Secure, Fast, and Free
          </p>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Why do thousands of users trust One Page Tools every day? The answer lies in our core principles:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {advantage.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Control of Your Workflow Like Never Before
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Whether you need a simple JPG to PDF conversion or a complex task like using the full Edit PDF tool, 
            One Page Tools is your go-to solution. Start using our extensive collection of free online PDF tools today.
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-lg shadow-lg hover:shadow-xl">
            Start Using PDF Tools Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFToolsLanding;