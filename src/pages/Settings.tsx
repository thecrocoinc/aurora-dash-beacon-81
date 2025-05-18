
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">
        Manage your application settings and preferences.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure application settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Settings form would appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
