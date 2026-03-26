"use client";
import React, { useEffect, useState } from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function PDFSignForm({ setPdfUrl }: any) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");

  // 👉 dynamic positions
  const [x, setX] = useState(108);
  const [y, setY] = useState(439);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        const existingPdfBytes = await fetch("/main-template.pdf").then((res) =>
          res.arrayBuffer(),
        );

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const firstPage = pdfDoc.getPages()[0];
        const lastPage = pdfDoc.getPages()[3];

        // firstPage.drawText(name || "", {
        //   x,
        //   y,
        //   size: 12,
        //   color: rgb(0.95, 0.1, 0.1),
        // });

        // firstPage.drawText(address || "", {
        //   x,
        //   y: y - 15,
        //   size: 12,
        //   color: rgb(0.95, 0.1, 0.1),
        // });

        // lastPage.drawText(name || "", {
        //   x,
        //   y,
        //   size: 12,
        //   color: rgb(0.95, 0.1, 0.1),
        // });

        // lastPage.drawText(signature || "", {
        //   x: x - 10,
        //   y: y + 10,
        //   size: 12,
        //   color: rgb(0.95, 0.1, 0.1),
        // });

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);

        setPdfUrl(url);
      } catch (err) {
        console.log(err);
      }
    };

    generatePDF();
  }, [name, address, x, y]); // 👈 realtime trigger
  return (
    <form className="flex flex-col space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-1">Full Name</label>
        <input
          type="text"
          required
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Address</label>
        <input
          required
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Signature</label>
        <input
          type="text"
          required
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">X pos</label>
        <input
          type="number"
          required
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          placeholder="X Pos"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Y pos</label>
        <input
          type="number"
          required
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          value={y}
          onChange={(e) => setY(Number(e.target.value))}
          placeholder="Y Pos"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full py-3 rounded-md text-white font-bold transition-all bg-primary hover:bg-opacity-90 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        Submit & Download PDF
      </button>
    </form>
  );
}
