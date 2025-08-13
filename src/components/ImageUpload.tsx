import React, { useRef, useState } from 'react';
import { Upload, Camera, X, Loader2, Zap } from 'lucide-react';
import { apiService } from '../services/api';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string, file: File) => void;
  uploadedImage: string | null;
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
  hasImage: boolean;
  uploadedFile: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
  onAnalyze,
  isAnalyzing,
  hasImage,
  uploadedFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string, file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    onImageUpload('', null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Skin Lesion Image
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG, JPEG • Max size: 10MB
              </p>
            </div>
            
            <button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium inline-flex items-center"
            >
              <Camera className="w-5 h-5 mr-2" />
              Choose Image
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative bg-gray-100 rounded-2xl p-4">
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            <img
              src={uploadedImage}
              alt="Uploaded skin lesion"
              className="w-full max-w-md mx-auto rounded-xl shadow-lg"
            />
          </div>
          
          <div className="text-center">
            <button
              onClick={() => uploadedFile && onAnalyze(uploadedFile)}
              disabled={isAnalyzing || !uploadedFile}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Analyze Image
                </>
              )}
            </button>
            
            {isAnalyzing && (
              <p className="text-gray-600 mt-4">
                Our AI is analyzing your image using advanced deep learning...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;