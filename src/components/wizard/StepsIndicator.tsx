type StepsIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepsIndicator({ currentStep, totalSteps }: StepsIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-4 mb-6">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-4 h-4 rounded-full 
          ${currentStep >= step ? "bg-green-500" : "bg-gray-400"} 
          transition duration-300`}
        />
      ))}
    </div>
  );
}