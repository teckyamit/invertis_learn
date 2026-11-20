"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { PYQUploadModal } from "./PYQUploadModal";

export function UploadPaperButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition"
      >
        <Upload className="h-3.5 w-3.5" />
        <span>Submit a Paper</span>
      </button>
      <PYQUploadModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
