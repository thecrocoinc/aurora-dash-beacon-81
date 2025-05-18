
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  tooltip?: string;
};

const FeatureCard = ({ icon, title, description, tooltip }: FeatureCardProps) => {
  const card = (
    <Card className="rounded-2xl shadow hover:scale-105 transition duration-300">
      <CardContent className="p-6">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {card}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return card;
};

const BizAgent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">BizAgent</h1>
      <p className="text-muted-foreground">
        AI agent for business operations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          icon="⚡" 
          title="Code" 
          description="Generate and patch code snippets for your nutrition app and integrations." 
        />
        <FeatureCard 
          icon="📈" 
          title="Promote" 
          description="Draft social posts and ads to engage more users with your nutrition content." 
        />
        <FeatureCard 
          icon="🔄" 
          title="Voice" 
          description="Connect new integrations on voice command to extend your nutrition platform."
          tooltip="Trigger ⌘K – Coming soon"
        />
      </div>
    </div>
  );
};

export default BizAgent;
