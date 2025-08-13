# SkinARTify - AI-Powered Skin Lesion Classification

A comprehensive web application for skin lesion classification using deep learning with DenseNet121 architecture.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python 3.7+ with pip
- Your trained Keras model file

### Installation

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Python dependencies:**
   ```bash
   pip install tensorflow numpy pillow
   ```

4. **Place your model:**
   - Copy your `skinartify_densenet_model.keras` file to `backend/models/`

### Running the Application

**Option 1: Run both frontend and backend together**
```bash
npm run dev:full
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
skinartify/
├── src/                          # Frontend React application
│   ├── components/              # React components
│   ├── services/               # API service layer
│   └── utils/                  # Utility functions
├── backend/                     # Backend Node.js API
│   ├── models/                 # Place your Keras model here
│   ├── uploads/                # Temporary image uploads
│   ├── server.js              # Express server
│   ├── predict.py             # Python prediction script
│   └── package.json           # Backend dependencies
├── public/                     # Static assets
└── package.json               # Frontend dependencies
```

## 🧠 Model Integration

### Model Requirements

Your model should:
- Be saved as `skinartify_densenet_model.keras`
- Accept 224x224x3 input images
- Output predictions for 7 classes in this order:
  1. akiec (Actinic keratoses)
  2. bcc (Basal cell carcinoma)
  3. bkl (Benign keratosis-like lesions)
  4. df (Dermatofibroma)
  5. melanoma (Melanoma)
  6. nevus (Melanocytic nevi)
  7. vasc (Vascular lesions)

### Model Placement

1. Place your `skinartify_densenet_model.keras` file in the `backend/models/` directory
2. The backend will automatically detect and load your model
3. If no model is found, the system will use mock predictions for testing

## 🔧 API Endpoints

- `GET /api/health` - Health check
- `POST /api/predict` - Image prediction (multipart/form-data with 'image' field)

## 🎨 Features

- **Beautiful UI**: Modern, medical-grade interface with responsive design
- **Drag & Drop**: Easy image upload with drag-and-drop support
- **Real-time Analysis**: Instant AI-powered skin lesion classification
- **Detailed Results**: Comprehensive prediction results with confidence scores
- **Medical Disclaimer**: Proper medical disclaimers and warnings
- **Error Handling**: Robust error handling and user feedback

## 🛠️ Development

### Frontend Development
```bash
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Building for Production
```bash
npm run build
```

## 📝 Notes

- The application includes mock predictions when no model is present for testing purposes
- Images are automatically resized to 224x224 pixels for model compatibility
- Uploaded images are temporarily stored and automatically cleaned up after processing
- The system supports common image formats (JPG, PNG, JPEG)
- Maximum file size is 10MB

## 🔒 Security & Disclaimers

This application is for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis. Always consult with qualified healthcare professionals for medical advice.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request