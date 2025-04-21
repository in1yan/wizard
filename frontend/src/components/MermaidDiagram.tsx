import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
}

const DEFAULT_ZOOM = 1;
const ZOOM_STEP = 0.2;
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.4;

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isRendered, setIsRendered] = useState(false);

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
        }).then(() => {
          setIsRendered(true);
        }).catch(error => {
          console.error('Mermaid rendering error:', error);
          setIsRendered(false);
        });
      } catch (error) {
        console.error('Mermaid rendering failed:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div class="text-red-500 p-3 border border-red-300 rounded">
            Failed to render diagram: ${error instanceof Error ? error.message : String(error)}
          </div>`;
        }
        setIsRendered(false);
      }
    }
    setZoom(DEFAULT_ZOOM);
  }, [chart]);

  useEffect(() => {
    if (!isRendered) return;
    if (containerRef.current && svgWrapperRef.current) {
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        svgWrapperRef.current.innerHTML = '';
        svgWrapperRef.current.appendChild(svg.cloneNode(true));
        const clonedSvg = svgWrapperRef.current.querySelector('svg');
        if (clonedSvg) {
          clonedSvg.style.width = '100%';
          clonedSvg.style.height = 'auto';
          clonedSvg.setAttribute('style', `display: block; margin: 0 auto; background: none;`);
        }
      }
    }
  }, [isRendered]);

  const handleDownload = () => {
    if (!svgWrapperRef.current) return;
    const svg = svgWrapperRef.current.querySelector('svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diagram.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="relative my-4 overflow-auto rounded-md bg-muted/30 p-4">
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={() => setZoom(zoom => Math.max(MIN_ZOOM, +(zoom - ZOOM_STEP).toFixed(2)))}
          disabled={zoom <= MIN_ZOOM}
          className="bg-neutral-800 text-primary-foreground rounded-full p-2 hover:bg-neutral-700 shadow transition disabled:opacity-50"
          aria-label="Zoom Out"
          type="button"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={() => setZoom(zoom => Math.min(MAX_ZOOM, +(zoom + ZOOM_STEP).toFixed(2)))}
          disabled={zoom >= MAX_ZOOM}
          className="bg-neutral-800 text-primary-foreground rounded-full p-2 hover:bg-neutral-700 shadow transition disabled:opacity-50"
          aria-label="Zoom In"
          type="button"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={handleDownload}
          className="bg-purple-800 text-primary-foreground rounded-full p-2 hover:bg-purple-700 shadow transition"
          aria-label="Download SVG"
          type="button"
        >
          <Download size={18} />
        </button>
      </div>

      <div
        ref={svgWrapperRef}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s cubic-bezier(.33,1,.68,1)',
          minHeight: '100px',
          width: '100%',
        }}
        className="overflow-visible"
      />
      
      <div 
        ref={containerRef} 
        className={isRendered ? "hidden" : "opacity-100"}
        aria-hidden={isRendered}
      />
    </div>
  );
};

export default MermaidDiagram;
