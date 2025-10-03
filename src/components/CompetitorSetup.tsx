import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Competitor {
  id: string;
  name: string;
  website: string;
  linkedin?: string;
  twitter?: string;
}

interface CompetitorSetupProps {
  onSetupComplete: (competitors: Competitor[]) => void;
}

const CompetitorSetup = ({ onSetupComplete }: CompetitorSetupProps) => {
  const { toast } = useToast();
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: "1", name: "", website: "", linkedin: "", twitter: "" },
  ]);

  const addCompetitor = () => {
    if (competitors.length >= 3) {
      toast({
        title: "Maximum reached",
        description: "You can track up to 3 competitors at once",
        variant: "destructive",
      });
      return;
    }
    setCompetitors([
      ...competitors,
      { id: Date.now().toString(), name: "", website: "", linkedin: "", twitter: "" },
    ]);
  };

  const removeCompetitor = (id: string) => {
    if (competitors.length === 1) return;
    setCompetitors(competitors.filter((c) => c.id !== id));
  };

  const updateCompetitor = (id: string, field: keyof Competitor, value: string) => {
    setCompetitors(
      competitors.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = () => {
    const validCompetitors = competitors.filter((c) => c.name && c.website);
    if (validCompetitors.length === 0) {
      toast({
        title: "Missing information",
        description: "Please add at least one competitor with name and website",
        variant: "destructive",
      });
      return;
    }
    onSetupComplete(validCompetitors);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold gradient-text mb-2">
          Track Your Competitors
        </h2>
        <p className="text-muted-foreground">
          Add up to 3 competitors to monitor their latest updates
        </p>
      </div>

      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <Card key={competitor.id} className="p-6 glow-card bg-card/50 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-foreground">
                Competitor {index + 1}
              </h3>
              {competitors.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCompetitor(competitor.id)}
                  className="hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor={`name-${competitor.id}`}>Company Name *</Label>
                <Input
                  id={`name-${competitor.id}`}
                  placeholder="e.g., Acme Corp"
                  value={competitor.name}
                  onChange={(e) =>
                    updateCompetitor(competitor.id, "name", e.target.value)
                  }
                  className="bg-input/50 border-border/50 focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor={`website-${competitor.id}`}>Website *</Label>
                <Input
                  id={`website-${competitor.id}`}
                  placeholder="https://example.com"
                  value={competitor.website}
                  onChange={(e) =>
                    updateCompetitor(competitor.id, "website", e.target.value)
                  }
                  className="bg-input/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`linkedin-${competitor.id}`}>LinkedIn</Label>
                  <Input
                    id={`linkedin-${competitor.id}`}
                    placeholder="linkedin.com/company/..."
                    value={competitor.linkedin}
                    onChange={(e) =>
                      updateCompetitor(competitor.id, "linkedin", e.target.value)
                    }
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor={`twitter-${competitor.id}`}>Twitter/X</Label>
                  <Input
                    id={`twitter-${competitor.id}`}
                    placeholder="@company"
                    value={competitor.twitter}
                    onChange={(e) =>
                      updateCompetitor(competitor.id, "twitter", e.target.value)
                    }
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        {competitors.length < 3 && (
          <Button
            onClick={addCompetitor}
            variant="outline"
            className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Competitor
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-gradient-sunset hover:opacity-90 font-semibold"
        >
          Start Tracking
        </Button>
      </div>
    </div>
  );
};

export default CompetitorSetup;
