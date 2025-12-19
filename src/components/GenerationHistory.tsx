import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  topic: string;
  titles: string[];
  thumbnail_url: string | null;
  created_at: string;
}

interface GenerationHistoryProps {
  onSelect: (item: HistoryItem) => void;
  refreshTrigger?: number;
}

const GenerationHistory = ({ onSelect, refreshTrigger }: GenerationHistoryProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("generation_history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching history:", error);
    } else {
      setHistory(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase
      .from("generation_history")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Delete failed");
    } else {
      setHistory(history.filter((item) => item.id !== id));
      toast.success("Deleted!");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-4">
        Loading history...
      </div>
    );
  }

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">Recent Generations</span>
      </div>
      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {item.topic}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDelete(item.id, e)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerationHistory;
