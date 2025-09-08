import React from 'react';
import { FileText, Mail, Shield, Users, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const tools = [
    { name: 'Merge PDF', href: '#all-tools' },
    { name: 'Split PDF', href: '#all-tools' },
    { name: 'Compress PDF', href: '#all-tools' },
    { name: 'Convert PDF', href: '#all-tools' },
    { name: 'Edit PDF', href: '#all-tools' },
    { name: 'Protect PDF', href: '#all-tools' }
  ];

  const company = [
    { name: 'About Us', href: '#about-us' },
    { name: 'Privacy Policy', href: '#', icon: <Shield className="w-3 h-3" /> },
    { name: 'Terms of Service', href: '#' },
    { name: 'Blog', href: '#' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-300 mt-20 overflow-hidden" id="contact-us">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Top Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Best PDF Tools</h3>
                <p className="text-sm text-blue-400">One Page Tools</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your complete, free, and secure solution for all PDF-related tasks. 
              Process files directly in your browser without uploading anything to our servers.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">No Sign-up</span>
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>PDF Tools</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {tools.map((tool, index) => (
                <li key={index} className="group">
                  <a 
                    href={tool.href} 
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                    <span>{tool.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Company</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index} className="group">
                  <a 
                    href={item.href} 
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
                    <span>{item.name}</span>
                    {item.icon && <span className="ml-1">{item.icon}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Get in Touch</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"></div>
            </h4>
            
            <div className="space-y-4">
              <div className="group">
                <a 
                  href="mailto:contact@bestpdftools.com" 
                  className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Us</p>
                    <p className="text-sm text-gray-400">contact@bestpdftools.com</p>
                  </div>
                </a>
              </div>

              <div className="group">
                <a 
                  href="#" 
                  className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <ExternalLink className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Report Issue</p>
                    <p className="text-sm text-gray-400">Found a bug? Let us know</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl p-4 border border-gray-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-sm text-gray-400">Files Processed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 Best PDF Tools. All Rights Reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Powered by advanced client-side technology
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for productivity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
    </footer>
  );
}