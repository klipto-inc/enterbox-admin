"use client"
import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import DOMPurify from 'dompurify';

const TailwindHtmlPreviewCapture = () => {
  const [inputHtml, setInputHtml] = useState<string>("");
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically inject Tailwind CSS
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCaptureClick = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'screenshot.png';
      link.click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedHtml = DOMPurify.sanitize(event.target.value);
    setInputHtml(sanitizedHtml);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <textarea
          // value={inputHtml}
          onChange={handleInputChange}
          className="w-full h-40 p-2 border border-gray-300 rounded"
          placeholder="Enter your HTML with Tailwind classes here..."
        />
      </div>

      <div className="mb-4 border p-4 bg-gray-100">
        <h2 className="text-lg text-red-800 font-semibold mb-2">Preview:</h2>
        <div
          ref={captureRef}
          className="p-4 bg-white border w-fit min-w-[200px] rounded flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: inputHtml }}
        />
      </div>

      <button
        onClick={handleCaptureClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Capture Screenshot
      </button>
    </div>
  );
};

export default TailwindHtmlPreviewCapture;