import { useEffect, useState } from "react";
import { Sparkles, Cpu, Wand2, Zap } from "lucide-react";

const processingSteps = [
  { icon: Cpu, text: "Analyzing video frames..." },
  { icon: Wand2, text: "AI aapki video enhance kar raha hai..." },
  { icon: Sparkles, text: "Improving sharpness & clarity..." },
  { icon: Zap, text: "Upscaling to HD resolution..." },
];

interface ProcessingAnimationProps {
  progress: number;
}

export const ProcessingAnimation = ({ progress }: ProcessingAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processingSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = processingSteps[currentStep].icon;

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
        {processingSteps[currentStep].text}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Please wait while our AI enhances your video quality. This may take a few minutes.
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-primary font-semibold">{progress}%</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Processing stats */}
      <div className="grid grid-cols-3 gap-6 mt-10 w-full max-w-md">
        {[
          { label: "Frames", value: Math.floor(progress * 24) },
          { label: "Enhanced", value: `${Math.floor(progress * 0.9)}%` },
          { label: "ETA", value: `${Math.max(1, Math.ceil((100 - progress) / 10))}m` },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-3 rounded-lg bg-card border border-border">
            <p className="text-xl font-display font-bold text-gradient">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
