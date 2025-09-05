import React from 'react';

const ToolCard = ({ tool, onClick }) => {
    if (!tool) return null;
  
    return (
      <div 
        className="bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:border-red-500 relative overflow-hidden group"
        onClick={() => onClick(tool)}
      >
        {/* Badge for new tools */}
        {tool.badge && (
          <div className="absolute top-3 right-[-35px] bg-red-600 text-white text-xs font-bold py-1 px-8 transform rotate-45 shadow-sm">
            {tool.badge}
          </div>
        )}
        {/* ...rest of your code */}
      </div>
    );
  };
  