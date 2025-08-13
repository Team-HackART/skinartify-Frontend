const API_BASE_URL = 'https://aryan195a-skinartify-backend.hf.space';

export interface PredictionResult {
  class: string;
  confidence: number;
  description: string;
}

export interface PredictionResponse {
  predictions: PredictionResult[];
  topPrediction: PredictionResult;
}

export const apiService = {
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) throw new Error('API health check failed');
    return response.json();
  },

  async predictImage(imageFile: File): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('file', imageFile); // ✅ must match backend param

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Prediction failed');
    }

    const data = await response.json();

    // Map object → array
    const predictionsArray: PredictionResult[] = Object.entries(data.predictions).map(
      ([className, confidence]) => ({
        class: className,
        confidence: confidence as number,
        description: getDescription(className)
      })
    );

    // Find top prediction
    const topPrediction = predictionsArray.reduce((max, curr) =>
      curr.confidence > max.confidence ? curr : max
    );

    return { predictions: predictionsArray, topPrediction };
  }
};

// Optional: disease descriptions
function getDescription(className: string): string {
  const descriptions: Record<string, string> = {
    nevus: 'A common benign mole.',
    melanoma: 'A serious type of skin cancer.',
    bcc: 'Basal Cell Carcinoma — usually slow-growing.',
    akiec: 'Actinic Keratoses — pre-cancerous skin lesions.',
    bkl: 'Benign Keratosis — harmless skin growths.',
    df: 'Dermatofibroma — benign fibrous nodule.',
    vasc: 'Vascular Lesion — usually benign blood vessel growth.'
  };
  return descriptions[className] || '';
}
