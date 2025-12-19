import { useEffect, useState } from "react";
import { Sparkles, Type, ImageIcon, Wand2 } from "lucide-react";

const generationSteps = [
  { icon: Wand2, text: "AI aapke topic analyze kar raha hai..." },
  { icon: Type, text: "Viral titles generate ho rahe hain..." },
  { icon: ImageIcon, text: "Thumbnail design ho rahi hai..." },
  { icon: Sparkles, text: "Final touches apply ho rahe hain..." },
];

interface GeneratingAnimationProps {
  step: "titles" | "thumbnail" | "complete";
}

export const GeneratingAnimation = ({ step }: GeneratingAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % generationSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = generationSteps[currentStep].icon;

  const getProgress = () => {
    switch (step) {
      case "titles": return 40;
      case "thumbnail": return 80;
      case "complete": return 100;
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-4">
      {/* Animated icon container */}
      <div className="relative mb-10">
        {/* Outer glow rings */}
        <div className="absolute inset-0 -m-8 rounded-full bg-primary/20 animate-ping" />
        <div className="absolute inset-0 -m-4 rounded-full bg-primary/10 animate-pulse-slow" />
        
        {/* Main icon container */}
        <div className="relative p-8 rounded-full bg-gradient-primary shadow-glow animate-float">
          <CurrentIcon className="w-16 h-16 text-primary-foreground" />
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 -m-12 animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-primary" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-accent" />
          <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 rounded-full bg-primary/60" />
          <div className="absolute right-0 top-1/2 w-3 h-3 -mt-1.5 rounded-full bg-accent/60" />
        </div>
      </div>

      {/* Processing text */}
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
        {generationSteps[currentStep].text}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Please wait while AI generates your viral title and thumbnail. This usually takes 15-30 seconds.
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-primary font-semibold">{getProgress()}%</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-primary transition-all duration-1000 ease-out"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="grid grid-cols-3 gap-6 mt-10 w-full max-w-md">
        {[
          { label: "Topic", done: true },
          { label: "Titles", done: step !== "titles" },
          { label: "Thumbnail", done: step === "complete" },
        ].map((item, index) => (
          <div 
            key={item.label} 
            className={`text-center p-3 rounded-lg border ${
              item.done 
                ? "bg-primary/10 border-primary" 
                : "bg-card border-border"
            }`}
          >
            <p className={`text-sm font-semibold ${item.done ? "text-primary" : "text-muted-foreground"}`}>
              {item.done ? "✓" : index + 1}
            </p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
