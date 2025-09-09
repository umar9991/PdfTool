import React from "react";
export default function ToolCard({ icon, title, description, onClick }) {
    return (
      <div
        className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
        onClick={onClick}
      >
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    );
  }
  