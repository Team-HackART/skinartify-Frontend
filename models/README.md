# SkinARTify Model Directory

This directory is where you should place your trained Keras model file.

## Expected Model File

Place your `skinartify_densenet_model.keras` file in this directory.

## Model Information

- **Architecture**: DenseNet121
- **Input Size**: 224x224x3
- **Classes**: 7 skin lesion types
  - nevus (Benign mole)
  - melanoma (Malignant melanoma)
  - bcc (Basal cell carcinoma)
  - akiec (Actinic keratoses)
  - bkl (Benign keratosis-like lesions)
  - df (Dermatofibroma)
  - vasc (Vascular lesions)

## Usage

Once you place the model file here, the backend API will automatically load it for inference.

## File Structure
```
models/
├── README.md
└── skinartify_densenet_model.keras  # Place your model file here
```