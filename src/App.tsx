import React, { useState } from 'react';
import { Upload, Brain, Shield, Users, Award, ChevronRight, X } from 'lucide-react';
import { apiService } from './services/api';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ImageUpload from './components/ImageUpload';
import Results from './components/Results';
import Footer from './components/Footer';

export interface PredictionResult {
  predictions: Array<{
    class: string;
    confidence: number;
    description: string;
  }>;
  topPrediction: {
    class: string;
    confidence: number;
    description: string;
  };
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string, file: File | null) => {
    setUploadedImage(imageUrl);
    setUploadedFile(file);
    setPredictionResult(null);
    setError(null);
  };

  const handleAnalyze = async (file: File) => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await apiService.predictImage(file);
      setPredictionResult(result);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main>
        <Hero />
        
        <section id="analyze" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI-Powered Skin Lesion Analysis
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload an image of a skin lesion for instant AI analysis using our advanced DenseNet model
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-red-500 text-white p-1 rounded-full">
                      <X className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800">Analysis Error</h4>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <ImageUpload 
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                uploadedFile={uploadedFile}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                hasImage={!!uploadedImage}
              />
              
              {predictionResult && (
                <Results result={predictionResult} />
              )}
            </div>
          </div>
        </section>
        
        <Features />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;