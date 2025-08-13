import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, TrendingUp, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PredictionResult } from '../App';

interface ResultsProps {
  result: PredictionResult;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  const getClassInfo = (className: string) => {
    const classMap: Record<
      string,
      { name: string; baseColor: string; icon: React.ReactNode; severity: string; description: string }
    > = {
      nevus: {
        name: 'Nevus (Mole)',
        baseColor: '#22c55e',
        icon: <CheckCircle className="w-5 h-5" />,
        severity: 'Benign',
        description: 'Common mole with little to no risk. Usually harmless but monitor changes.',
      },
      melanoma: {
        name: 'Melanoma',
        baseColor: '#ef4444',
        icon: <AlertTriangle className="w-5 h-5" />,
        severity: 'Malignant',
        description: 'Serious skin cancer that requires immediate medical attention.',
      },
      bcc: {
        name: 'Basal Cell Carcinoma',
        baseColor: '#f97316',
        icon: <AlertTriangle className="w-5 h-5" />,
        severity: 'Malignant',
        description: 'A common skin cancer with low spread risk but needs treatment.',
      },
      akiec: {
        name: 'Actinic Keratoses',
        baseColor: '#eab308',
        icon: <Info className="w-5 h-5" />,
        severity: 'Pre-cancerous',
        description: 'Rough patches caused by sun damage. Can develop into cancer.',
      },
      bkl: {
        name: 'Benign Keratosis',
        baseColor: '#3b82f6',
        icon: <CheckCircle className="w-5 h-5" />,
        severity: 'Benign',
        description: 'Harmless thickened skin growths.',
      },
      df: {
        name: 'Dermatofibroma',
        baseColor: '#6366f1',
        icon: <CheckCircle className="w-5 h-5" />,
        severity: 'Benign',
        description: 'Firm, harmless skin nodules.',
      },
      vasc: {
        name: 'Vascular Lesion',
        baseColor: '#a855f7',
        icon: <Info className="w-5 h-5" />,
        severity: 'Benign',
        description: 'Lesions from blood vessels. Usually harmless.',
      },
    };
    return (
      classMap[className] || {
        name: className,
        baseColor: '#9ca3af',
        icon: <Info className="w-5 h-5" />,
        severity: 'Unknown',
        description: 'No description available.',
      }
    );
  };

  const confidenceToGradient = (color: string, confidence: number) => {
    const opacity = Math.min(1, 0.4 + confidence);
    return `linear-gradient(to right, ${color}AA, ${color}${Math.floor(opacity * 255).toString(16)})`;
  };

  const useAnimatedCounter = (value: number) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => `${latest.toFixed(1)}%`);
    React.useEffect(() => {
      animate(count, value * 100, { duration: 1, ease: 'easeOut' });
    }, [value]);
    return rounded;
  };

  const topPrediction = result.topPrediction;
  const topClassInfo = getClassInfo(topPrediction.class);
  const topCounter = useAnimatedCounter(topPrediction.confidence);

  React.useEffect(() => {
    if (topClassInfo.severity === 'Benign') {
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    }
  }, []);

  return (
    <div className="mt-8 space-y-6">
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Analysis Results
        </h3>

        {/* Top Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03, boxShadow: '0px 10px 25px rgba(0,0,0,0.15)' }}
          className="shadow-lg rounded-2xl p-6 relative overflow-hidden"
          style={{
            border: `2px solid ${topClassInfo.baseColor}`,
            background: confidenceToGradient(topClassInfo.baseColor, topPrediction.confidence),
          }}
        >
          {/* Pulse Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ backgroundColor: topClassInfo.baseColor, opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ backgroundColor: topClassInfo.baseColor }}
                className="text-white p-2 rounded-lg"
              >
                {topClassInfo.icon}
              </motion.div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{topClassInfo.name}</h4>
                <p style={{ color: topClassInfo.baseColor }} className="font-medium">
                  {topClassInfo.severity}
                </p>
              </div>
            </div>
            <div className="text-right">
              <motion.div className="text-3xl font-bold text-gray-900">{topCounter}</motion.div>
              <div className="text-sm text-gray-600">Confidence</div>
            </div>
          </div>

          <p className="text-gray-700 italic relative z-10">{topClassInfo.description}</p>

          <div className="mt-4">
            <div className="bg-white/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${topPrediction.confidence * 100}%` }}
                transition={{ duration: 1 }}
                style={{ backgroundColor: topClassInfo.baseColor }}
                className="h-full rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* All Predictions */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-gray-600" />
            Detailed Classification Probabilities
          </h4>
          <div className="space-y-3">
            {result.predictions.map((prediction, index) => {
              const classInfo = getClassInfo(prediction.class);
              const counter = useAnimatedCounter(prediction.confidence);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, boxShadow: '0px 4px 12px rgba(0,0,0,0.08)' }}
                  className="flex items-center justify-between bg-white rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      style={{ backgroundColor: `${classInfo.baseColor}22`, color: classInfo.baseColor }}
                      className="p-2 rounded-lg"
                    >
                      {classInfo.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{classInfo.name}</div>
                      <div className="text-sm text-gray-600">{classInfo.severity}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.confidence * 100}%` }}
                        transition={{ duration: 0.8 }}
                        style={{ background: confidenceToGradient(classInfo.baseColor, prediction.confidence) }}
                        className="h-2 rounded-full"
                      />
                    </div>
                    <motion.div className="text-sm font-medium text-gray-900 w-12 text-right">{counter}</motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-amber-800 mb-1">Medical Disclaimer</h5>
              <p className="text-amber-700 text-sm">
                This AI analysis is for educational and research purposes only. It should not be used as a substitute for
                professional medical diagnosis. Please consult with a qualified dermatologist for proper medical evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
