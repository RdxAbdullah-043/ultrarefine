import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading?: boolean;
}

export const TopicInput = ({ onSubmit, isLoading }: TopicInputProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  const exampleTopics = [
    "How to grow on YouTube in 2024",
    "iPhone 16 Pro Max Review",
    "Day in my life as a developer",
    "Best budget gaming setup"
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your video topic... (e.g., 'How to make money online in 2024')"
          className="min-h-[120px] text-base resize-none pr-4"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Lightbulb className="w-4 h-4" />
          Examples:
        </span>
        {exampleTopics.map((example) => (
          <button
            key={example}
            onClick={() => setTopic(example)}
            className="px-3 py-1 text-xs rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            {example}
          </button>
        ))}
      </div>

      <Button
        variant="gradient"
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={!topic.trim() || isLoading}
      >
        {isLoading ? "Generating..." : "Generate Title + Thumbnail 🚀"}
      </Button>
    </div>
  );
};
