import { CompetitorUpdate } from "./UpdateCard";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink } from "lucide-react";

interface TimelineProps {
  updates: CompetitorUpdate[];
}

const categoryColors = {
  "Product Launch": "bg-accent/20 text-accent border-accent/50",
  "Feature Update": "bg-primary/20 text-primary border-primary/50",
  "Marketing Campaign": "bg-primary-glow/20 text-primary-glow border-primary-glow/50",
};

const Timeline = ({ updates }: TimelineProps) => {
  return (
    <div className="relative space-y-8 pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-accent before:to-transparent">
      {updates.map((update, index) => (
        <div key={update.id} className="relative">
          <div
            className="absolute -left-[33px] w-4 h-4 rounded-full bg-primary shadow-glow"
            style={{
              background: `hsl(${24 + index * 4} 100% 50%)`,
            }}
          />
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 glow-card">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{update.date}</span>
                    <span className="text-foreground/60">•</span>
                    <span className="font-medium text-foreground">
                      {update.competitorName}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground hover:gradient-text transition-all">
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

              <p className="text-muted-foreground leading-relaxed">
                {update.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Badge
                  variant="outline"
                  className={`${categoryColors[update.category]} font-semibold`}
                >
                  {update.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{update.source}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
