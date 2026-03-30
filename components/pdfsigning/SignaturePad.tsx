"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Type, Pen, ImageUp, RotateCcw } from "lucide-react";
import { Alex_Brush } from "next/font/google";

const alexBrush = Alex_Brush({
  variable: "--font-alexbrush",
  subsets: ["latin"],
  weight: "400",
});

type Tab = "type" | "draw" | "upload";

export default function SignaturePad({
  defaultName = "",
  error,
}: {
  defaultName?: string;
  error?: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("type");
  const [typedName, setTypedName] = useState(defaultName);
  const [signatureValue, setSignatureValue] = useState(defaultName);
  const [uploadPreview, setUploadPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  // Persist drawing across tab switches
  const drawingDataRef = useRef<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Load cursive font
  // useEffect(() => {
  //   if (!document.getElementById("sig-font-link")) {
  //     const link = document.createElement("link");
  //     link.id = "sig-font-link";
  //     link.rel = "stylesheet";
  //     link.href =
  //       "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap";
  //     document.head.appendChild(link);
  //   }
  // }, []);

  // Sync signature value when tab changes
  useEffect(() => {
    if (activeTab === "type") setSignatureValue(typedName);
    else if (activeTab === "draw") setSignatureValue(drawingDataRef.current);
    else if (activeTab === "upload") setSignatureValue(uploadPreview);
  }, [activeTab, typedName, uploadPreview]);

  // Canvas ref callback — runs fresh each time canvas mounts
  const canvasCallbackRef = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    canvasRef.current = canvas;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = "#1c5244";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // Restore previous drawing if any
    if (drawingDataRef.current) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = drawingDataRef.current;
    }
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    const { x, y } = getPos(e);
    lastX.current = x;
    lastY.current = y;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing.current || !ctxRef.current) return;
    const { x, y } = getPos(e);
    const ctx = ctxRef.current;

    ctx.beginPath();
    ctx.moveTo(lastX.current, lastY.current);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX.current = x;
    lastY.current = y;
    setHasDrawing(true);

    const dataUrl = canvasRef.current!.toDataURL("image/png");
    drawingDataRef.current = dataUrl;
    setSignatureValue(dataUrl);
  };

  const stopDraw = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctxRef.current.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    drawingDataRef.current = "";
    setHasDrawing(false);
    setSignatureValue("");
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadPreview(result);
      setSignatureValue(result);
    };
    reader.readAsDataURL(file);
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "type", label: "Type", icon: <Type size={13} strokeWidth={2} /> },
    { id: "draw", label: "Draw", icon: <Pen size={13} strokeWidth={2} /> },
    {
      id: "upload",
      label: "Upload",
      icon: <ImageUp size={13} strokeWidth={2} />,
    },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
        Signature
      </label>

      {/* Hidden form input */}
      <input type="hidden" name="signature" value={signatureValue} />

      {/* Tab switcher */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 px-1 rounded-[10px] text-[12px] font-semibold transition-all duration-200 select-none
              ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-400 hover:text-gray-500"
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content panel */}
      <div
        className={`rounded-xl border overflow-hidden transition-colors ${
          error ? "border-red-300" : "border-[#e2e8e6]"
        }`}
      >
        {/* ── TYPE TAB ── */}
        {activeTab === "type" && (
          <div className="">
            {/* Editable name input */}
            <div className="px-4 pt-4 pb-3 border-b border-[#e2e8e6]">
              <input
                type="text"
                value={typedName}
                onChange={(e) => {
                  setTypedName(e.target.value);
                  setSignatureValue(e.target.value);
                }}
                placeholder="Enter your full name"
                className="w-full px-3 py-2.5 border border-[#e2e8e6] rounded-lg text-[13.5px] text-secondary bg-[#fafbfa]
                  placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            {/* Cursive preview */}
            <div className="flex items-center justify-center bg-[#f9faf9] min-h-25 px-6 py-4 relative">
              {/* Baseline rule */}
              <div className="absolute bottom-[38%] left-6 right-6 border-b border-dashed border-gray-200" />
              {typedName ? (
                <span
                  className={`${alexBrush.className} text-primary leading-[1.1] font-[clamp(1.8rem_6vw_2.6rem)] text-2xl`}
                >
                  {typedName}
                </span>
              ) : (
                <span className="text-[13px] text-gray-300 italic">
                  Signature preview appears here
                </span>
              )}
            </div>

            <div className="px-4 py-2 bg-[#fafbfa] border-t border-[#e2e8e6]">
              <p className="text-[10.5px] text-gray-400 leading-relaxed">
                By typing your name, you agree this constitutes your legal
                electronic signature.
              </p>
            </div>
          </div>
        )}

        {/* ── DRAW TAB ── */}
        {activeTab === "draw" && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#fafbfa] border-b border-[#e2e8e6]">
              <span className="text-[11px] text-gray-400 font-medium">
                Sign with your finger or mouse
              </span>
              <button
                type="button"
                onClick={clearCanvas}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-400 transition-colors py-1 px-2 rounded-md hover:bg-red-50"
              >
                <RotateCcw size={11} strokeWidth={2.5} />
                Clear
              </button>
            </div>

            <div className="relative bg-white">
              {/* Baseline */}
              <div className="absolute bottom-[30%] left-4 right-4 border-b border-dashed border-gray-200 pointer-events-none" />

              {!hasDrawing && !drawingDataRef.current && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[13px] text-gray-300 italic">
                    Draw your signature here
                  </span>
                </div>
              )}

              <canvas
                ref={canvasCallbackRef}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
                className="block w-full"
                style={{
                  height: "130px",
                  touchAction: "none",
                  cursor: "crosshair",
                }}
              />
            </div>

            <div className="px-4 py-2 bg-[#fafbfa] border-t border-[#e2e8e6]">
              <p className="text-[10.5px] text-gray-400">
                Draw your signature using touch or mouse.
              </p>
            </div>
          </div>
        )}

        {/* ── UPLOAD TAB ── */}
        {activeTab === "upload" && (
          <div className="p-4">
            {uploadPreview ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-full bg-[#f9faf9] rounded-xl border border-[#e2e8e6] flex items-center justify-center p-4 min-h-25">
                  <img
                    src={uploadPreview}
                    alt="Uploaded signature"
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUploadPreview("");
                    setSignatureValue("");
                  }}
                  className="text-[11.5px] text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <RotateCcw size={11} strokeWidth={2.5} />
                  Remove & re-upload
                </button>
              </div>
            ) : (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) handleFile(file);
                }}
                className={`flex flex-col items-center justify-center gap-2.5 min-h-30 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                  ${
                    isDragging
                      ? "border-primary bg-primary/5 scale-[0.99]"
                      : "border-[#e2e8e6] hover:border-primary/50 hover:bg-[#fafbfa]"
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                  ${isDragging ? "bg-primary/10" : "bg-gray-100"}`}
                >
                  <ImageUp
                    size={18}
                    className={isDragging ? "text-primary" : "text-gray-400"}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-medium text-gray-500">
                    {isDragging ? "Drop image here" : "Upload signature image"}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    PNG, JPG, or SVG · Drag & drop or click
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </label>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-[11.5px] text-red-500">{error}</p>}
    </div>
  );
}
