import { Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-8 h-8 text-primary" strokeWidth={2.5} />
              <div className="absolute inset-0 blur-lg bg-primary/30 -z-10" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">
                Smart Digest
              </h1>
              <p className="text-xs text-muted-foreground">Competitor Intelligence</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
