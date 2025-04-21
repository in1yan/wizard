
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#8b5cf6',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#6d28d9',
        lineColor: '#94a3b8',
        secondaryColor: '#475569',
        tertiaryColor: '#1e293b',
      }
    });

    if (containerRef.current) {
      try {
        containerRef.current.innerHTML = '';
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        const element = document.createElement('div');
        element.id = id;
        element.classList.add('flex', 'justify-center');
        element.textContent = chart;
        containerRef.current.appendChild(element);
        
        mermaid.run({
          nodes: [element]
        });
      } catch (error) {
        console.error('Mermaid rendering failed:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div class="text-red-500 p-3 border border-red-300 rounded">
            Failed to render diagram: ${error instanceof Error ? error.message : String(error)}
          </div>`;
        }
      }
    }
  }, [chart]);

  return (
    <div className="my-4 overflow-auto rounded-md bg-muted/30 p-4" ref={containerRef} />
  );
};

export default MermaidDiagram;
