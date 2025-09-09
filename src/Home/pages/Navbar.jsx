import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#', active: true },
    { name: 'All Tools', href: '#all-tools', hasDropdown: true },
    { name: 'About Us', href: '#about-us' },
    { name: 'Contact Us', href: '#contact-us' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
        : 'bg-white/80 backdrop-blur-sm shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Best PDF Tools
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 -mt-1">Free & Secure</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <a
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 ${
                    item.active
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}

                  {/* Active indicator */}
                  {item.active && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"></div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </a>

                {/* Dropdown for All Tools */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 sm:w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-4 space-y-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Popular Tools</div>
                      {['Merge PDF', 'Split PDF', 'Compress PDF', 'PDF to Word', 'Edit PDF', 'Protect PDF'].map((tool, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200 group/item"
                        >
                          <div className="w-2 h-2 bg-red-400 rounded-full group-hover/item:bg-red-600 transition-colors duration-200"></div>
                          <span className="text-gray-700 group-hover/item:text-red-600 transition-colors duration-200">{tool}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-[28rem] opacity-100 visible'      
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-4 py-4 space-y-2 bg-gradient-to-br from-gray-50 to-red-50/30 rounded-xl mt-3 border border-gray-200/50 backdrop-blur-sm">
            {navItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    item.active
                      ? 'text-red-600 bg-white shadow-sm'
                      : 'text-gray-700 hover:text-red-600 hover:bg-white/70'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {item.active && (
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  )}
                </a>

                {/* Mobile dropdown for All Tools */}
                {item.hasDropdown && isMenuOpen && (
                  <div className="ml-6 mt-2 space-y-1">
                    {['Merge PDF', 'Split PDF', 'Compress PDF'].map((tool, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 rounded-lg hover:bg-white/50 transition-colors duration-200"
                      >
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span>{tool}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-200/50">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Try Tools Now
              </button>
            </div>
          </div>
        </div>
      </div>

     
    </nav>
  );
};

export default Navbar;