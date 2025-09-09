import React from 'react'
import ToolCard from '../components/ToolCard'

export default function AllTools() {
    pdfTools = [
        {
          id: "merge",
          title: "Merge PDF",
          description: "Combine PDFs in the order you want...",
          icon: "🖇️",
        },];
  return (
    <div>
        <ToolCard  key={tool.id}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}  />
      
    </div>
  )
}
