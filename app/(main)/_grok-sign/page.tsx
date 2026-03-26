"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import * as pdfLib from "pdf-lib";

// Set up PDF.js worker (works out-of-the-box with Next.js app router)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function SignPage() {
  // Form state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // PDF viewer state
  const [numPages, setNumPages] = useState<number | null>(null);

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Tailwind-ready colors
  const primary = "#1c5244";
  const secondary = "#333333";
  const accent = "#f8ab1d";

  // Initialize canvas size and styles once mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas responsive to its container width
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = secondary;
    };

    resizeCanvas();
    // Re-run on window resize (handles mobile/desktop)
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Mouse & Touch drawing helpers
  const getCoordinates = (
    e: MouseEvent | TouchEvent,
  ): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e.nativeEvent);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const coords = getCoordinates(e.nativeEvent);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // PDF document load handler
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Generate signed PDF + download
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !address.trim()) {
      alert("Please fill Name and Address");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      alert("Signature canvas not ready");
      return;
    }

    // Get signature as PNG
    const signatureDataUrl = canvas.toDataURL("image/png");

    try {
      // Load original template (must be placed in /public/template.pdf)
      const existingPdfBytes = await fetch("/template.pdf").then((res) =>
        res.arrayBuffer(),
      );

      const pdfDoc = await pdfLib.PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      // === POSITIONING (adjust these numbers to match your exact PDF layout) ===
      // PDF coordinates: (0,0) = bottom-left, units = points (1 inch = 72 points)
      // Typical US Letter page = 612 × 792 points
      // Page 1 = pages[0], Page 4 = pages[3]

      // Name on Page 1
      pages[0].drawText(name.trim(), {
        x: 80,
        y: 620,
        size: 14,
        color: pdfLib.rgb(0.1, 0.1, 0.1),
      });

      // Address on Page 1 (multi-line support)
      const addressLines = address.trim().split("\n");
      let addressY = 580;
      addressLines.forEach((line) => {
        pages[0].drawText(line, {
          x: 80,
          y: addressY,
          size: 12,
          color: pdfLib.rgb(0.1, 0.1, 0.1),
        });
        addressY -= 18; // line spacing
      });

      // Signature image on Page 4 (last page)
      const signatureBytes = await fetch(signatureDataUrl).then((res) =>
        res.arrayBuffer(),
      );
      const signatureImage = await pdfDoc.embedPng(signatureBytes);

      pages[3].drawImage(signatureImage, {
        x: 80,
        y: 120,
        width: 280,
        height: 90,
      });

      // Save & trigger download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "signed-document.pdf";
      link.click();
      URL.revokeObjectURL(url);

      // Optional: clear form after successful download
      // setName(''); setAddress(''); clearSignature();
    } catch (err) {
      console.error(err);
      alert(
        "Failed to generate signed PDF. Make sure /public/template.pdf exists.",
      );
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      {/* LEFT: 70% PDF Viewer */}
      <div className="w-[70%] overflow-auto bg-white border-r border-[#e5e5e5] p-8">
        <div className="max-w-[720px] mx-auto">
          <Document
            file="/template.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-96 text-[#1c5244]">
                Loading PDF...
              </div>
            }
          >
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <div
                  key={`page-${index + 1}`}
                  className="mb-8 shadow-xl border border-[#e5e5e5] bg-white"
                >
                  <Page
                    pageNumber={index + 1}
                    width={700} // readable size for 4-page PDF
                    renderTextLayer={true}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
          </Document>
        </div>
      </div>

      {/* RIGHT: 30% Form */}
      <div
        className="w-[30%] flex flex-col p-8"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h1
          className="text-2xl font-semibold mb-8 tracking-tight"
          style={{ color: primary }}
        >
          Complete Document
        </h1>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {/* Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
              style={{ color: secondary }}
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                borderColor: secondary,
                focusRingColor: accent,
              }}
              required
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium mb-2"
              style={{ color: secondary }}
            >
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-y"
              style={{
                borderColor: secondary,
                focusRingColor: accent,
              }}
              required
            />
          </div>

          {/* Signature */}
          <div className="flex-1 flex flex-col mb-8">
            <div className="flex items-center justify-between mb-2">
              <label
                className="text-sm font-medium"
                style={{ color: secondary }}
              >
                Signature
              </label>
              <button
                type="button"
                onClick={clearSignature}
                className="text-xs px-3 py-1 rounded-md hover:bg-gray-100"
                style={{ color: accent }}
              >
                Clear
              </button>
            </div>

            <div
              className="border-2 rounded-xl overflow-hidden bg-white flex-1 flex items-center justify-center cursor-crosshair"
              style={{ borderColor: secondary }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-[200px]"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
            <p
              className="text-[10px] text-center mt-2"
              style={{ color: "#999" }}
            >
              Draw your signature above
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-auto w-full py-4 text-lg font-semibold rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              backgroundColor: primary,
              color: "#ffffff",
            }}
          >
            Submit &amp; Download Signed PDF
          </button>
        </form>

        <p className="text-xs text-center mt-6" style={{ color: "#999" }}>
          70/30 split • 4-page PDF • Tailwind + PDF-Lib
        </p>
      </div>
    </div>
  );
}
