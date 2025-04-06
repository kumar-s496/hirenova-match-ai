
import { CheckCircle, Circle } from "lucide-react";

export type Step = {
  id: number;
  name: string;
  description: string;
};

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
}

const ProgressTracker = ({ steps, currentStep }: ProgressTrackerProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step.id} className={`flex-1 ${index === steps.length - 1 ? "" : ""}`}>
            <div className="flex items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > step.id
                      ? "border-hirenova-600 bg-hirenova-600 text-white"
                      : currentStep === step.id
                      ? "border-hirenova-600 text-hirenova-600"
                      : "border-gray-300 text-gray-300"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span>{step.id + 1}</span>
                  )}
                </div>
                <div className="text-center mt-2">
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-hirenova-600" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 hidden md:block mt-1">{step.description}</div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-hirenova-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
