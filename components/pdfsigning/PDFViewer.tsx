"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
} from "lucide-react";

// ✅ Fix 1: CDN worker — no webpack/Turbopack config needed
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  src: string;
}

export default function PDFViewer({ src }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  //   const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setContainerWidth(node.getBoundingClientRect().width);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const pdfFile = src.startsWith("data:")
    ? { data: atob(src.split(",")[1]) }
    : src;

  const pageWidth =
    containerWidth > 0 ? Math.min(containerWidth - 32, 800) * scale : undefined;

  return (
    <div className="flex flex-col h-full bg-[#1a1f1e]">
      {/* Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-3 py-2 bg-[#111514] border-b border-white/10">
        <div className="flex items-center gap-1">
          {/* <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} strokeWidth={2.5} />
          </button>
          <span className="text-[12px] text-white/50 px-1 tabular-nums">
            {isLoading ? "—" : `${pageNumber} / ${numPages}`}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={15} strokeWidth={2.5} />
          </button> */}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)))
            }
            disabled={scale <= 0.5}
            className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomOut size={14} strokeWidth={2} />
          </button>
          <span className="text-[12px] text-white/50 w-10 text-center tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(3, +(s + 0.25).toFixed(2)))}
            disabled={scale >= 3}
            className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomIn size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Document area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto overscroll-contain relative"
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
            <Loader2
              size={28}
              className="text-accent animate-spin"
              strokeWidth={1.5}
            />
            <span className="text-white/40 text-[12px]">Loading document…</span>
          </div>
        )}
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
          className="flex flex-col items-center py-4 gap-4"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              width={pageWidth}
              renderTextLayer={true}
              renderAnnotationLayer={false}
              className="shadow-2xl shadow-black/50"
            />
          ))}
        </Document>
        {/* <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
          className="flex flex-col items-center py-4"
        >
          <Page
            key={`page_${pageNumber}`}
            pageNumber={pageNumber}
            width={pageWidth}
            renderTextLayer={true}
            renderAnnotationLayer={false}
            className="shadow-2xl shadow-black/50"
          />
        </Document> */}
      </div>
    </div>
  );
}
