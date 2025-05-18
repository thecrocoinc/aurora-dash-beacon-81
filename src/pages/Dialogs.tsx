
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dialogs = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dialogs</h1>
      <p className="text-muted-foreground">
        Manage conversations and message threads.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>View and manage recent conversations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Dialog list would appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dialogs;
