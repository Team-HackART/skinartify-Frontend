# SkinARTify - AI-Powered Skin Lesion Classification

SkinARTify is a full-stack web application for AI-powered skin disease detection using a fine-tuned DenseNet121 model. It provides fast and reliable classification across 7 skin lesion types with an intuitive and responsive interface.

## 🚀 Quick Start
The application will be available at:
- Frontend: [SkinARTify Web App](https://skinartify-frontend.vercel.app/)
- Backend API: [Hugging Face Space](https://huggingface.co/spaces/aryan195a/SKINARTIFY_backend)
  
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

The model should:
- Accept 224x224x3 input images
- Output predictions for 7 classes in this order:
  1. akiec (Actinic keratoses)
  2. bcc (Basal cell carcinoma)
  3. bkl (Benign keratosis-like lesions)
  4. df (Dermatofibroma)
  5. melanoma (Melanoma)
  6. nevus (Melanocytic nevi)
  7. vasc (Vascular lesions)

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
