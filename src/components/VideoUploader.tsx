import { useCallback, useState } from "react";
import { Upload, Film, X } from "lucide-react";
import { Button } from "./ui/button";

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

const ACCEPTED_FORMATS = ["video/mp4", "video/x-matroska", "video/avi", "video/quicktime", "video/webm"];
const ACCEPTED_EXTENSIONS = ".mp4,.mkv,.avi,.mov,.webm";

export const VideoUploader = ({ onFileSelect, selectedFile, onClear }: VideoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && ACCEPTED_FORMATS.some(format => file.type.includes(format.split('/')[1]))) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + " GB";
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB";
    return (bytes / 1024).toFixed(2) + " KB";
  };

  if (selectedFile) {
    return (
      <div className="relative p-6 rounded-xl bg-card border border-border shadow-card">
        <button
          onClick={onClear}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-secondary hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-primary">
            <Film className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative p-12 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
        isDragging
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-border hover:border-primary/50 hover:bg-card"
      }`}
    >
      <input
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center text-center">
        <div className={`p-5 rounded-2xl mb-6 transition-all duration-300 ${
          isDragging ? "bg-gradient-primary" : "bg-secondary group-hover:bg-gradient-primary"
        }`}>
          <Upload className={`w-10 h-10 transition-colors ${
            isDragging ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary-foreground"
          }`} />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          Drop your video here
        </h3>
        <p className="text-muted-foreground mb-4">
          or click to browse from your device
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["MP4", "MKV", "AVI", "MOV", "WebM"].map((format) => (
            <span
              key={format}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
            >
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
