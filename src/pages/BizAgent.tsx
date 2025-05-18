
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const BizAgent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">BizAgent</h1>
      <p className="text-muted-foreground">
        AI agent for business operations.
      </p>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardContent className="pt-6 text-center">
          <div className="rounded-full bg-primary/10 p-4 inline-block mb-4">
            <MessageCircle className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Start a Conversation</h3>
          <p className="text-muted-foreground max-w-md">
            Connect with our AI-powered business assistant to get nutrition insights, 
            meal planning advice, and personalized health recommendations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BizAgent;
