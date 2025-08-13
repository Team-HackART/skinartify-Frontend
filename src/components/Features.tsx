import React from 'react';
import { Brain, Shield, Zap, Users, Award, TrendingUp } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Model",
      description: "DenseNet121 architecture trained on HAM10000 dataset with over 10,000 dermatoscopic images",
      color: "blue"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Medical Grade Accuracy",
      description: "High precision classification with focal loss optimization and class balancing techniques",
      color: "green"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Analysis",
      description: "Get comprehensive skin lesion analysis results in seconds with confidence scores",
      color: "purple"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "7 Lesion Types",
      description: "Classifies melanoma, nevus, BCC, actinic keratoses, benign keratosis, dermatofibroma, and vascular lesions",
      color: "indigo"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Research Backed",
      description: "Built using state-of-the-art deep learning techniques with extensive validation and testing",
      color: "orange"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Model performance continuously improved through advanced training techniques and data augmentation",
      color: "red"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cutting-Edge Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines advanced deep learning with medical expertise 
            to provide accurate skin lesion classification
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`bg-${feature.color}-100 text-${feature.color}-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience AI-Powered Dermatology?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Upload your first skin lesion image and see our advanced AI in action
          </p>
          <a 
            href="#analyze"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg inline-block"
          >
            Start Analysis Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;