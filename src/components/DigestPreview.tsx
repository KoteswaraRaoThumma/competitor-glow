import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CompetitorUpdate } from "./UpdateCard";
import { Mail, FileDown, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DigestPreviewProps {
  updates: CompetitorUpdate[];
  competitors: Array<{ name: string }>;
}

const DigestPreview = ({ updates, competitors }: DigestPreviewProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendEmail = () => {
    toast({
      title: "Email sent!",
      description: "Daily digest has been sent to your inbox",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export started",
      description: "Your digest is being prepared for download",
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Digest generated!",
        description: "Your daily digest has been updated with the latest insights",
      });
    }, 2000);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatesByCategory = {
    "Product Launch": updates.filter((u) => u.category === "Product Launch"),
    "Feature Update": updates.filter((u) => u.category === "Feature Update"),
    "Marketing Campaign": updates.filter((u) => u.category === "Marketing Campaign"),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-gradient-sunset hover:opacity-90 font-semibold flex-1"
        >
          <Sparkles className={`w-4 h-4 mr-2 ${isGenerating ? "animate-pulse" : ""}`} />
          {isGenerating ? "Generating..." : "Generate Digest"}
        </Button>
        <Button
          onClick={handleSendEmail}
          variant="outline"
          className="border-primary/30 hover:bg-primary/10"
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </Button>
        <Button
          onClick={handleExportPDF}
          variant="outline"
          className="border-primary/30 hover:bg-primary/10"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <Card className="p-8 glow-card bg-card/50 backdrop-blur-sm">
        <div className="space-y-6 max-w-3xl">
          <div className="border-b border-border/50 pb-6">
            <h1 className="text-3xl font-display font-bold gradient-text mb-2">
              Daily Competitor Digest
            </h1>
            <p className="text-muted-foreground">{today}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-display font-bold text-foreground">
              📊 Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Today's intelligence covers {updates.length} updates across{" "}
              {competitors.length} competitor{competitors.length !== 1 ? "s" : ""}:{" "}
              {competitors.map((c) => c.name).join(", ")}. Notable activity includes{" "}
              {updatesByCategory["Product Launch"].length} product launch
              {updatesByCategory["Product Launch"].length !== 1 ? "es" : ""},{" "}
              {updatesByCategory["Feature Update"].length} feature update
              {updatesByCategory["Feature Update"].length !== 1 ? "s" : ""}, and{" "}
              {updatesByCategory["Marketing Campaign"].length} marketing campaign
              {updatesByCategory["Marketing Campaign"].length !== 1 ? "s" : ""}.
            </p>
          </div>

          {Object.entries(updatesByCategory).map(
            ([category, categoryUpdates]) =>
              categoryUpdates.length > 0 && (
                <div key={category} className="space-y-3">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    {category === "Product Launch" && "🚀"}
                    {category === "Feature Update" && "⚡"}
                    {category === "Marketing Campaign" && "📢"} {category}
                  </h2>
                  <div className="space-y-4">
                    {categoryUpdates.map((update) => (
                      <div
                        key={update.id}
                        className="pl-4 border-l-2 border-primary/30 space-y-1"
                      >
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-semibold text-foreground">
                            {update.competitorName}:
                          </h3>
                          <span className="text-foreground">{update.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {update.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Source: {update.source} • {update.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}

          <div className="border-t border-border/50 pt-6 space-y-2">
            <h2 className="text-xl font-display font-bold text-foreground">
              💡 Key Takeaways
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Competitive landscape is actively evolving with new product
                  launches and feature updates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Marketing activity indicates aggressive growth strategies across
                  competitors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Monitor these developments for potential market opportunities and
                  strategic responses
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DigestPreview;
