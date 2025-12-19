import { useState } from "react";
import { Header } from "@/components/Header";
import { TopicInput } from "@/components/TopicInput";
import { GeneratingAnimation } from "@/components/GeneratingAnimation";
import { GenerationResult } from "@/components/GenerationResult";
import { AuthModal } from "@/components/AuthModal";
import GenerationHistory from "@/components/GenerationHistory";
import { Sparkles, Zap, Youtube, ImageIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AppState = "home" | "generating" | "result";
type GenerationStep = "titles" | "thumbnail" | "complete";

const Index = () => {
  const { user, loading } = useAuth();
  const [appState, setAppState] = useState<AppState>("home");
  const [generationStep, setGenerationStep] = useState<GenerationStep>("titles");
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleGenerate = async (inputTopic: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setTopic(inputTopic);
    setIsLoading(true);
    setAppState("generating");
    setGenerationStep("titles");

    try {
      // Step 1: Generate titles
      const { data: titleData, error: titleError } = await supabase.functions.invoke("generate-title", {
        body: { topic: inputTopic },
      });

      if (titleError) {
        throw new Error(titleError.message || "Failed to generate titles");
      }

      if (titleData.error) {
        throw new Error(titleData.error);
      }

      const generatedTitles = titleData.titles || [];
      setTitles(generatedTitles);
      setGenerationStep("thumbnail");

      // Step 2: Generate thumbnail using the first title
      const { data: thumbData, error: thumbError } = await supabase.functions.invoke("generate-thumbnail", {
        body: { 
          topic: inputTopic, 
          title: generatedTitles[0] || inputTopic 
        },
      });

      if (thumbError) {
        throw new Error(thumbError.message || "Failed to generate thumbnail");
      }

      if (thumbData.error) {
        throw new Error(thumbData.error);
      }

      setThumbnailUrl(thumbData.imageUrl);
      setGenerationStep("complete");
      
      // Save to history
      await supabase.from("generation_history").insert({
        user_id: user.id,
        topic: inputTopic,
        titles: generatedTitles,
        thumbnail_url: thumbData.imageUrl,
      });
      setHistoryRefresh((prev) => prev + 1);
      
      setAppState("result");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Generation failed. Please try again.");
      setAppState("home");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppState("home");
    setTopic("");
    setTitles([]);
    setThumbnailUrl("");
    setGenerationStep("titles");
  };

  const handleSelectHistory = (item: {
    topic: string;
    titles: string[];
    thumbnail_url: string | null;
  }) => {
    setTopic(item.topic);
    setTitles(item.titles);
    setThumbnailUrl(item.thumbnail_url || "");
    setAppState("result");
  };

  const features = [
    {
      icon: Youtube,
      title: "Viral Titles",
      description: "AI generates clickable, viral YouTube titles that get views",
    },
    {
      icon: ImageIcon,
      title: "AI Thumbnails",
      description: "Beautiful thumbnails designed to maximize click-through rate",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get your title and thumbnail in seconds, not hours",
    },
    {
      icon: Sparkles,
      title: "AI Powered",
      description: "Using latest AI models for best quality results",
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
                AI-Powered YouTube Tools
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
                Generate Viral{" "}
                <span className="text-gradient">Titles + Thumbnails</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Enter your video topic and let AI create clickable titles and 
                eye-catching thumbnails that get more views.
              </p>
            </section>

            {/* Input Section */}
            <section className="max-w-2xl mx-auto mb-16">
              <div className="p-8 rounded-2xl bg-card/50 border border-border backdrop-blur-sm shadow-card">
                <TopicInput onSubmit={handleGenerate} isLoading={isLoading} />
              </div>
              
              {/* Generation History */}
              {user && (
                <GenerationHistory 
                  onSelect={handleSelectHistory} 
                  refreshTrigger={historyRefresh}
                />
              )}
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-10">
                Why Use TitleGen AI?
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
                  { step: "1", title: "Enter Topic", desc: "Type your video idea" },
                  { step: "2", title: "AI Generates", desc: "Get titles + thumbnail" },
                  { step: "3", title: "Download", desc: "Use on your video" },
                ].map((item) => (
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
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {appState === "generating" && (
          <div className="container mx-auto flex items-center justify-center min-h-[70vh]">
            <GeneratingAnimation step={generationStep} />
          </div>
        )}

        {appState === "result" && (
          <div className="container mx-auto flex items-center justify-center min-h-[70vh]">
            <GenerationResult
              titles={titles}
              thumbnailUrl={thumbnailUrl}
              topic={topic}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 TitleGen AI. AI-powered YouTube tools.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default Index;
