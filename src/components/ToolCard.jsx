import React from 'react';

const ToolCard = ({ tool, onClick, index }) => {
  const IconComponent = tool.icon;

  return (
    <div 
      className={`group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 border ${tool.borderColor} hover:border-opacity-60 animate-slide-up`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onClick(tool.id)}
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
};

export default ToolCard;