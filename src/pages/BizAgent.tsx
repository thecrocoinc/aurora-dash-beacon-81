
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BizAgent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">BizAgent</h1>
      <p className="text-muted-foreground">
        AI agent for business operations.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>AI Business Agent</CardTitle>
          <CardDescription>Your automated business assistant.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>BizAgent interface would appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BizAgent;
