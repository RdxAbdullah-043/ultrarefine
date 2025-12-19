import { Sparkles, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-lg bg-gradient-primary transition-transform group-hover:scale-110">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">
            Title<span className="text-gradient">Gen</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <a href="#features" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          ) : (
            <Button asChild variant="default" size="sm" className="gap-2">
              <Link to="/auth">
                <LogIn className="w-4 h-4" />
                <span className="hidden md:inline">Login</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
