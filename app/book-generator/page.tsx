"use client";
import { Button } from "@/components/ui/button";
import { Send, Upload, Loader } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);
    if (showPrompt) {
      formData.append("prompt", prompt);
    }

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
      if (!showPrompt) {
        setShowPrompt(true);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">booknoter</h1>
      <div className="mb-6">
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
      {showPrompt && (
        <div className="mb-6">
          <textarea
            id="prompt"
            rows={4}
            className="w-full p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={handlePromptChange}
          ></textarea>
        </div>
      )}
      {file && (
        <Button onClick={handleSubmit} disabled={loading} className="w-full mb-6">
          {loading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Processing (this may take 1-2 minutes)...
            </>
          ) : (
            <>
              {showPrompt ? 'Generate New Notes' : 'Generate Initial Notes'}
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div className="mt-6 relative">
          <h2 className="text-xl font-semibold mb-2">OCR Result:</h2>
          <div className={`bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto overflow-x-hidden ${loading ? 'blur-sm' : ''}`}>
            {Object.keys(result).map((key) => (
              <div key={key}>
                <strong>{key}:</strong> {result[key]}
              </div>
            ))}
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg">
              <div className="text-center">
                <Loader className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Please wait for 1-2 minutes...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}