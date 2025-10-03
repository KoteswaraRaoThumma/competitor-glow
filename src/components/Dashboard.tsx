import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateCard, { CompetitorUpdate } from "./UpdateCard";
import Timeline from "./Timeline";
import DigestPreview from "./DigestPreview";
import { LayoutGrid, Clock, FileText, RefreshCw } from "lucide-react";

// Mock data - in production this would come from API
const mockUpdates: CompetitorUpdate[] = [
  {
    id: "1",
    competitorName: "TechCorp",
    title: "AI-Powered Analytics Dashboard Launch",
    description:
      "TechCorp has launched a new AI-powered analytics dashboard that provides real-time insights and predictive analytics for enterprise customers. The platform uses machine learning to identify trends and anomalies.",
    category: "Product Launch",
    source: "Website",
    date: "2 hours ago",
    url: "https://example.com",
  },
  {
    id: "2",
    competitorName: "InnovateCo",
    title: "Enhanced Mobile Experience Update",
    description:
      "Major update to their mobile app includes dark mode, improved navigation, and 50% faster load times. The update also introduces new gesture controls and accessibility features.",
    category: "Feature Update",
    source: "LinkedIn",
    date: "5 hours ago",
    url: "https://example.com",
  },
  {
    id: "3",
    competitorName: "MarketLeader",
    title: "Summer Growth Campaign: 40% Off Enterprise Plans",
    description:
      "Limited-time promotion targeting mid-market and enterprise customers with significant discounts and extended trial periods. Campaign runs through end of quarter.",
    category: "Marketing Campaign",
    source: "Twitter",
    date: "1 day ago",
    url: "https://example.com",
  },
  {
    id: "4",
    competitorName: "TechCorp",
    title: "New API Integration Marketplace",
    description:
      "Launching an integration marketplace with 50+ pre-built connectors for popular business tools. Developers can now build and sell custom integrations.",
    category: "Feature Update",
    source: "Website",
    date: "2 days ago",
    url: "https://example.com",
  },
  {
    id: "5",
    competitorName: "InnovateCo",
    title: "Series C Funding Announcement - $50M",
    description:
      "Secured $50M in Series C funding led by top venture firms. Funds will be used to expand engineering team and accelerate product development in AI and automation.",
    category: "Marketing Campaign",
    source: "LinkedIn",
    date: "3 days ago",
    url: "https://example.com",
  },
];

interface DashboardProps {
  competitors: Array<{ name: string }>;
}

const Dashboard = ({ competitors }: DashboardProps) => {
  const [updates, setUpdates] = useState<CompetitorUpdate[]>(mockUpdates);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold gradient-text">
            Competitor Intelligence
          </h2>
          <p className="text-muted-foreground mt-1">
            Tracking {competitors.length} competitor{competitors.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-primary/10 border border-primary/30 hover:bg-primary/20 text-primary"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="bg-card/50 border border-border/50">
          <TabsTrigger value="grid" className="data-[state=active]:bg-primary/20">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-primary/20">
            <Clock className="w-4 h-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="digest" className="data-[state=active]:bg-primary/20">
            <FileText className="w-4 h-4 mr-2" />
            Daily Digest
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {updates.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Timeline updates={updates} />
        </TabsContent>

        <TabsContent value="digest" className="mt-6">
          <DigestPreview updates={updates} competitors={competitors} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
