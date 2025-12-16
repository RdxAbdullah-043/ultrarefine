import { Download, RotateCcw, Play, Pause, CheckCircle, ArrowUp, Focus, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef } from "react";

interface ResultPreviewProps {
  videoUrl: string;
  fileName: string;
  quality: string;
  onReset: () => void;
}

export const ResultPreview = ({ videoUrl, fileName, quality, onReset }: ResultPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `enhanced_${quality}_${fileName}`;
    link.click();
  };

  const enhancements = [
    { icon: ArrowUp, label: "Resolution", value: `Upscaled to ${quality}` },
    { icon: Focus, label: "Sharpness", value: "+40% Enhanced" },
    { icon: Sparkles, label: "Clarity", value: "AI Optimized" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Success header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-green-500/20">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Enhancement Complete!
        </h2>
      </div>

      {/* Video preview */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-card mb-6">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video object-cover"
          onEnded={() => setIsPlaying(false)}
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 hover:opacity-100 transition-opacity"
        >
          <div className="p-5 rounded-full bg-primary/90 hover:bg-primary transition-colors shadow-glow">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-primary-foreground" />
            ) : (
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            )}
          </div>
        </button>
        
        {/* Quality badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold">
          {quality} HD
        </div>
      </div>

      {/* Enhancement stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {enhancements.map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-xl bg-card border border-border text-center"
          >
            <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="font-semibold text-foreground text-sm mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="gradient" size="lg" onClick={handleDownload} className="gap-2">
          <Download className="w-5 h-5" />
          Download HD Video
        </Button>
        <Button variant="outline" size="lg" onClick={onReset} className="gap-2">
          <RotateCcw className="w-5 h-5" />
          Enhance Another Video
        </Button>
      </div>
    </div>
  );
};
