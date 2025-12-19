import { useState } from "react";
import { Download, RotateCcw, CheckCircle, Copy, Check, Image as ImageIcon, Type } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface GenerationResultProps {
  titles: string[];
  thumbnailUrl: string;
  topic: string;
  onReset: () => void;
}

export const GenerationResult = ({ titles, thumbnailUrl, topic, onReset }: GenerationResultProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedTitle, setSelectedTitle] = useState(0);

  const copyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title);
    setCopiedIndex(index);
    toast.success("Title copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadThumbnail = async () => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `thumbnail_${topic.slice(0, 30).replace(/\s+/g, "_")}.png`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Thumbnail downloaded!");
    } catch (error) {
      toast.error("Failed to download thumbnail");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Success header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-green-500/20">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Generation Complete!
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Titles Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Type className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground">Viral Titles</h3>
          </div>
          
          <div className="space-y-3">
            {titles.map((title, index) => (
              <div
                key={index}
                onClick={() => setSelectedTitle(index)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTitle === index
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-foreground font-medium flex-1">{title}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyTitle(title, index);
                    }}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors shrink-0"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <ImageIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground">AI Thumbnail</h3>
          </div>
          
          <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-card">
            <img
              src={thumbnailUrl}
              alt="Generated thumbnail"
              className="w-full aspect-video object-cover"
            />
          </div>

          <Button 
            variant="gradient" 
            size="lg" 
            onClick={downloadThumbnail} 
            className="w-full gap-2"
          >
            <Download className="w-5 h-5" />
            Download Thumbnail
          </Button>
        </div>
      </div>

      {/* Reset button */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" size="lg" onClick={onReset} className="gap-2">
          <RotateCcw className="w-5 h-5" />
          Generate Another
        </Button>
      </div>
    </div>
  );
};
