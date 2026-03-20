"use client";

import { Download } from "lucide-react"; // Assuming you use lucide-react for icons

export default function DownloadNdaButton() {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-gray-900">
          Signed Non-Disclosure Agreement
        </h3>
        <p className="text-sm text-gray-500">
          Your executed copy and certificate of completion.
        </p>
      </div>

      {/* Using a standard <a> tag pointing to an API route is the cleanest 
        way to handle file downloads in Next.js 
      */}
      <a
        href="/api/docusign/download-nda"
        className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </a>
    </div>
  );
}
