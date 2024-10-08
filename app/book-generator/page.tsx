"use client";

import { Button } from "@/components/ui/button";
import { Send, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle form submission for OCR processing
  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://akm-image-latest.onrender.com/api/v1/generate-notes/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      // Handle any error as a general case
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">booknoter</h1>
      <div className="mb-6">
        <label
          htmlFor="image-upload"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Upload Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG or JPEG (MAX. 800x400px)
              </p>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {preview && (
        <div className="mb-6">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-sm h-auto rounded-lg shadow-md mx-auto"
          />
        </div>
      )}

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Processing..." : "Send for OCR"}
        {!loading && <Send className="ml-2 h-4 w-4" />}
      </Button>

      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">OCR Result:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
