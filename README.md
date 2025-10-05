<div align="center">

# 🩺 SkinARTify - AI-Powered Skin Lesion Classification

**A full-stack web application for AI-powered skin disease detection using a fine-tuned DenseNet121 model.**

</div>

<div align="center">

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/Code-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20On-Vercel-black?logo=vercel)](https://vercel.com/)
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97-Backend%20API-FFD21E)](https://huggingface.co/)

</div>

SkinARTify provides fast and reliable classification across 7 common skin lesion types through an intuitive and responsive interface. This tool is designed for educational and research purposes, demonstrating the power of deep learning in medical imaging.

---

## 🚀 Live Demo

-   **Frontend Web App:** **[skinartify-frontend.vercel.app](https://skinartify-frontend.vercel.app/)**
-   **Backend API Host:** **[Hugging Face Space](https://huggingface.co/spaces/aryan195a/SKINARTIFY_backend)**

---

## ✨ Features

-   **Modern UI**: A clean, medical-grade interface built with React, TypeScript, and Tailwind CSS.
-   **Easy Image Upload**: Simple drag-and-drop functionality for uploading skin lesion images.
-   **Real-time Analysis**: Get instant AI-powered classification results within seconds.
-   **Detailed Results**: View comprehensive prediction results with confidence scores for each lesion type.
-   **Robust Error Handling**: Clear feedback and guidance for users in case of errors.
-   **Developer-Friendly**: Includes mock predictions for frontend testing without a live model.

---

## 🏗️ Architecture Overview

The application is built with a decoupled architecture. **This repository contains the React frontend code.** The backend API and the machine learning model are hosted separately as a public API on **Hugging Face Spaces**.

The workflow is as follows:
1.  **React Frontend (This Repo)**: The user interacts with the React application built with Vite and TypeScript, and uploads an image.
2.  **API Call**: The frontend sends the image to the public backend API endpoint hosted on Hugging Face.
3.  **Backend & ML Model (Hugging Face)**: The remote server runs the Python script, performs inference using the DenseNet121 model, and returns the prediction.
4.  **Display Results**: The React frontend receives the JSON response and displays the classification results to the user.

---

## 🔧 Running Locally

To run the frontend on your local machine for development, follow these steps.

### **Prerequisites**

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Git](https://git-scm.com/)

### **1. Clone the Repository**

```bash
git clone [https://github.com/your-username/skinartify-frontend.git](https://github.com/your-username/skinartify-frontend.git)
cd skinartify-frontend
```
### **2. Install Dependencies**
This project uses `npm` to manage dependencies. Run the following command in your terminal:

```bash
npm install
```

### **3. Configure Environment Variables**
The frontend needs to know the URL of your deployed backend API.

1.  Create a new file in the root of the project named `.env.local`.
2.  Add the following line, replacing the URL with the link to your Hugging Face Space API.

```
# .env.local
VITE_API_URL=[https://aryan195a-skinartify-backend.hf.space](https://aryan195a-skinartify-backend.hf.space)
```

*(**Note**: Vite requires environment variables to be prefixed with `VITE_` to be accessible in the frontend code.)*

### **4. Run the Development Server**
Start the Vite development server with this command:

```bash
npm run dev
```

Your browser should automatically open to `http://localhost:5173` (or another port if 5173 is busy), where you'll see the application running and communicating with your live Hugging Face backend.

---

## 🧠 Model & API Details

This section describes the API the frontend communicates with.

### **Model Requirements**

-   **Input Shape**: `(224, 224, 3)`
-   **Output Classes**: 7 classes, with the following order:
    -   `akiec` (Actinic keratoses)
    -   `bcc` (Basal cell carcinoma)
    -   `bkl` (Benign keratosis-like lesions)
    -   `df` (Dermatofibroma)
    -   `melanoma` (Melanoma)
    -   `nevus` (Melanocytic nevi)
    -   `vasc` (Vascular lesions)

### **API Endpoints**

| Method | Endpoint      | Description                                                    |
| :----- | :------------ | :------------------------------------------------------------- |
| `GET`  | `/api/health` | Health check to confirm if the server is running.              |
| `POST` | `/api/predict`| Upload an image for prediction. Expects `multipart/form-data`. |

---

## ⚠️ Medical Disclaimer

This application is for **educational and research purposes only**. The predictions are not a substitute for professional medical diagnosis. Always consult a qualified healthcare professional for any medical concerns or advice.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
