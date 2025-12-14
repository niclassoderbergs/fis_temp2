
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e6effc',
    primaryBorderColor: '#0052cc',
    lineColor: '#42526e',
    secondaryColor: '#ffffff',
    tertiaryColor: '#ffffff'
  },
  securityLevel: 'loose',
});

interface MermaidProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Återställ innehållet och sätt in koden
      containerRef.current.innerHTML = chart;
      containerRef.current.removeAttribute('data-processed');
      
      // Kör mermaid render
      mermaid.run({
        nodes: [containerRef.current]
      }).catch(err => {
        console.error("Mermaid error:", err);
        if (containerRef.current) {
             let msg = "Unknown error";
             if (err instanceof Error) {
                msg = err.message;
             } else if (typeof err === 'string') {
                msg = err;
             } else if (typeof err === 'object' && err !== null) {
                 if ('message' in err) {
                     msg = (err as any).message;
                 } else if ('str' in err) {
                     msg = (err as any).str;
                 } else {
                     try {
                        msg = JSON.stringify(err);
                     } catch (e) {
                        msg = "Error object could not be stringified";
                     }
                 }
             }

             containerRef.current.innerHTML = `<div style="color:#c00; font-family:monospace; padding:10px; border:1px solid #fdd; background:#fee;">
               <strong>Diagram Syntax Error:</strong><br/>${msg}
             </div>`;
        }
      });
    }
  }, [chart]);

  return (
    <div 
      className="mermaid" 
      ref={containerRef}
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '24px', 
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #ebecf0',
        minHeight: '100px',
        overflowX: 'auto'
      }}
    >
      {/* Initial content handled by useEffect */}
    </div>
  );
};
