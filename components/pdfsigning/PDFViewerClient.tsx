"use client";

import { useState } from "react";
import PDFSignForm from "./PDFSignForm";

export default function PDFViewerClient() {
  const [pdfSource, setPdfSource] = useState(
    "/main-template.pdf#toolbar=0&navpanes=0",
  );

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-secondary">
      <div className="md:w-[70%] w-full h-[50vh] md:h-full bg-gray-200">
        <iframe
          // The iframe reads from React state
          src={pdfSource}
          className="w-full h-full border-none"
          title="Document Viewer"
        />
      </div>

      <div className="md:w-[30%] w-full h-[50vh] md:h-full p-8 overflow-y-auto bg-white text-secondary flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-primary">Sign Document</h2>

        <PDFSignForm
          onPreviewReady={(base64Uri) =>
            setPdfSource(`${base64Uri}#toolbar=0&navpanes=0`)
          }
        />
      </div>
    </div>
  );
}
