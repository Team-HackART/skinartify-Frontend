export const SKIN_LESION_CLASSES = [
  'akiec',    // Actinic keratoses and intraepithelial carcinoma
  'bcc',      // Basal cell carcinoma
  'bkl',      // Benign keratosis-like lesions
  'df',       // Dermatofibroma
  'melanoma', // Melanoma
  'nevus',    // Melanocytic nevi
  'vasc'      // Vascular lesions
] as const;

export type SkinLesionClass = typeof SKIN_LESION_CLASSES[number];

export const CLASS_DESCRIPTIONS: Record<SkinLesionClass, string> = {
  'akiec': 'Actinic keratoses and intraepithelial carcinoma - Pre-cancerous lesions',
  'bcc': 'Basal cell carcinoma - Most common form of skin cancer',
  'bkl': 'Benign keratosis-like lesions - Non-cancerous skin growths',
  'df': 'Dermatofibroma - Benign fibrous skin nodule',
  'melanoma': 'Melanoma - Serious form of skin cancer',
  'nevus': 'Melanocytic nevi - Common benign moles',
  'vasc': 'Vascular lesions - Blood vessel related skin lesions'
};

export const CLASS_SEVERITY: Record<SkinLesionClass, 'Benign' | 'Pre-cancerous' | 'Malignant'> = {
  'akiec': 'Pre-cancerous',
  'bcc': 'Malignant',
  'bkl': 'Benign',
  'df': 'Benign',
  'melanoma': 'Malignant',
  'nevus': 'Benign',
  'vasc': 'Benign'
};