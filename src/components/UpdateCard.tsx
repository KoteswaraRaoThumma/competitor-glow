import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar } from "lucide-react";

export interface CompetitorUpdate {
  id: string;
  competitorName: string;
  title: string;
  description: string;
  category: "Product Launch" | "Feature Update" | "Marketing Campaign";
  source: string;
  date: string;
  url?: string;
}

interface UpdateCardProps {
  update: CompetitorUpdate;
}

const categoryColors = {
  "Product Launch": "bg-accent/20 text-accent border-accent/50",
  "Feature Update": "bg-primary/20 text-primary border-primary/50",
  "Marketing Campaign": "bg-primary-glow/20 text-primary-glow border-primary-glow/50",
};

const UpdateCard = ({ update }: UpdateCardProps) => {
  return (
    <Card className="p-6 glow-card bg-card/50 backdrop-blur-sm group">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={`${categoryColors[update.category]} font-semibold`}
              >
                {update.category}
              </Badge>
              <span className="text-sm font-medium text-muted-foreground">
                {update.competitorName}
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-foreground group-hover:gradient-text transition-all">
              {update.title}
            </h3>
          </div>
          {update.url && (
            <a
              href={update.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">{update.description}</p>

        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{update.date}</span>
          </div>
          <span className="text-xs">{update.source}</span>
        </div>
      </div>
    </Card>
  );
};

export default UpdateCard;
