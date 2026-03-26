"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument, rgb } from "pdf-lib";

export default function DocumentSignerPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleClearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sigCanvas.current?.isEmpty()) {
      alert("Please provide a signature.");
      return;
    }

    try {
      const existingPdfBytes = await fetch("/template.pdf").then((res) =>
        res.arrayBuffer(),
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // 1. Access the embedded form
      const form = pdfDoc.getForm();

      const fields = form.getFields();
      fields.forEach((field) => {
        const type = field.constructor.name;
        const name = field.getName();
        console.log(`Type: ${type} | Name: ${name}`);
      });

      // 2. Fill the text fields (Replace with your PDF's exact field names)
      const nameField = form.getTextField("NameAtTop");
      const addressField = form.getTextField("Address");

      nameField.setText(name);
      addressField.setText(address);

      // 3. Handle the Signature
      const signatureDataUrl = sigCanvas.current
        ?.getTrimmedCanvas()
        .toDataURL("image/png");
      if (signatureDataUrl) {
        const signatureImageBytes = await fetch(signatureDataUrl).then((res) =>
          res.arrayBuffer(),
        );
        const pngImage = await pdfDoc.embedPng(signatureImageBytes);

        // Find the placeholder field for the signature to get its exact coordinates
        // This assumes you have a text or button field acting as the signature box
        const sigField = form.getField("Signature");
        const widgets = sigField.acroField.getWidgets();
        const sigRect = widgets[0].getRectangle(); // This gets the x, y, width, and height!

        // Draw the image exactly inside the bounding box of the form field
        const pages = pdfDoc.getPages();
        const targetPage = pages[3]; // Assuming the signature field is on the 4th page

        targetPage.drawImage(pngImage, {
          x: sigRect.x,
          y: sigRect.y,
          width: sigRect.width,
          height: sigRect.height,
        });
      }

      // 4. Flatten the form
      // This merges the form data directly into the document so it can no longer be edited,
      // and it hides any empty blue boxes from the unfilled fields.
      form.flatten();

      // 5. Save and download (same as before)
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${name.replace(/\s+/g, "_")}_signed_document.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#333333]">
      {/* Left Pane (70%) - PDF Viewer */}
      {/* We use a native iframe to display the PDF cleanly. The #toolbar=0 hides the browser's default PDF toolbar. */}
      <div className="md:w-[70%] w-full h-[50vh] md:h-full bg-gray-200">
        <iframe
          src="/template.pdf#toolbar=0&navpanes=0"
          className="w-full h-full border-none"
          title="Document Viewer"
        />
      </div>

      {/* Right Pane (30%) - Form */}
      <div className="md:w-[30%] w-full h-[50vh] md:h-full p-8 overflow-y-auto bg-white text-[#333333] flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-[#1c5244]">
          Sign Document
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#f8ab1d] focus:border-transparent transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <textarea
              required
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#f8ab1d] focus:border-transparent transition-all"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Signature
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#f8ab1d] transition-all bg-gray-50">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  className: "w-full h-40 cursor-crosshair",
                  // Ensure canvas doesn't blur on high DPI screens
                  style: { width: "100%", height: "100%" },
                }}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleClearSignature}
                className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear Signature
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-md text-white font-bold transition-all bg-[#1c5244] hover:bg-opacity-90 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Submit & Download PDF
          </button>
        </form>
      </div>
    </div>
  );
}
