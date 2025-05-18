
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Profiles = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Profiles</h1>
      <p className="text-muted-foreground">
        View and manage user profiles.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>User profile list would appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
