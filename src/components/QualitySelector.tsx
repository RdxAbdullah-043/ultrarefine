import { Check } from "lucide-react";

interface QualitySelectorProps {
  selected: string;
  onSelect: (quality: string) => void;
}

const qualities = [
  { value: "720p", label: "HD 720p", description: "Good quality, faster processing" },
  { value: "1080p", label: "Full HD 1080p", description: "Best quality, recommended" },
];

export const QualitySelector = ({ selected, onSelect }: QualitySelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Output Quality</label>
      <div className="grid grid-cols-2 gap-4">
        {qualities.map((quality) => (
          <button
            key={quality.value}
            onClick={() => onSelect(quality.value)}
            className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              selected === quality.value
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {selected === quality.value && (
              <div className="absolute top-3 right-3 p-1 rounded-full bg-primary">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <p className="font-display font-semibold text-foreground">{quality.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{quality.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
