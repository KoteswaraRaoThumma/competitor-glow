import { useState } from "react";
import Header from "@/components/Header";
import CompetitorSetup from "@/components/CompetitorSetup";
import Dashboard from "@/components/Dashboard";

interface Competitor {
  id: string;
  name: string;
  website: string;
  linkedin?: string;
  twitter?: string;
}

const Index = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleSetupComplete = (newCompetitors: Competitor[]) => {
    setCompetitors(newCompetitors);
    setIsSetupComplete(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {!isSetupComplete ? (
          <CompetitorSetup onSetupComplete={handleSetupComplete} />
        ) : (
          <Dashboard competitors={competitors} />
        )}
      </main>
    </div>
  );
};

export default Index;
