import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { VideoUploader } from "@/components/VideoUploader";
import { QualitySelector } from "@/components/QualitySelector";
import { ProcessingAnimation } from "@/components/ProcessingAnimation";
import { ResultPreview } from "@/components/ResultPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";

type AppState = "home" | "processing" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [progress, setProgress] = useState(0);
  const [resultVideoUrl, setResultVideoUrl] = useState<string>("");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleStartProcessing = () => {
    if (!selectedFile) return;

    setAppState("processing");
    setProgress(0);

    // Simulate processing (in real app, this would call your backend)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Create a preview URL from the original file
          const url = URL.createObjectURL(selectedFile);
          setResultVideoUrl(url);
          setAppState("result");
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 200);
  };

  const handleReset = () => {
    setAppState("home");
    setSelectedFile(null);
    setProgress(0);
    setResultVideoUrl("");
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI Enhancement",
      description: "Advanced AI algorithms enhance every frame of your video",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Get your HD video in minutes, not hours",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your videos are processed securely and never stored",
    },
    {
      icon: Clock,
      title: "No Limits",
      description: "Enhance as many videos as you want",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <main className="relative pt-24 pb-16">
        {appState === "home" && (
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                AI-Powered Video Enhancement
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
                Transform Your Videos to{" "}
                <span className="text-gradient">Crystal Clear HD</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Upload any video and let our AI enhance it to stunning HD quality. 
                Reduce blur, increase sharpness, and improve resolution in minutes.
              </p>
            </section>

            {/* Upload Section */}
            <section className="max-w-2xl mx-auto mb-16">
              <div className="p-8 rounded-2xl bg-card/50 border border-border backdrop-blur-sm shadow-card">
                <VideoUploader
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onClear={handleClearFile}
                />

                {selectedFile && (
                  <div className="mt-6 space-y-6">
                    <QualitySelector
                      selected={selectedQuality}
                      onSelect={setSelectedQuality}
                    />
                    <Button
                      variant="gradient"
                      size="lg"
                      className="w-full"
                      onClick={handleStartProcessing}
                    >
                      Start Enhancement
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-10">
                Why Choose VideoHD?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
                  >
                    <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="max-w-4xl mx-auto mt-20">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-10">
                How It Works
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {[
                  { step: "1", title: "Upload", desc: "Select your video file" },
                  { step: "2", title: "Process", desc: "AI enhances your video" },
                  { step: "3", title: "Download", desc: "Get your HD video" },
                ].map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                      <span className="text-2xl font-display font-bold text-primary-foreground">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    {index < 2 && (
                      <div className="hidden md:block absolute">
                        <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {appState === "processing" && (
          <div className="container mx-auto flex items-center justify-center min-h-[70vh]">
            <ProcessingAnimation progress={Math.min(100, Math.round(progress))} />
          </div>
        )}

        {appState === "result" && selectedFile && (
          <div className="container mx-auto flex items-center justify-center min-h-[70vh]">
            <ResultPreview
              videoUrl={resultVideoUrl}
              fileName={selectedFile.name}
              quality={selectedQuality}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 VideoHD. AI-powered video enhancement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
