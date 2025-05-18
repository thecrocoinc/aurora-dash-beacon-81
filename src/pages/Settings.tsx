
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

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
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">System Prompt</h3>
            <Textarea 
              disabled 
              className="min-h-[150px]"
              value="You are a helpful nutrition assistant that guides users through their health journey. You provide meal suggestions, track caloric intake, and offer supportive advice for achieving health goals. Responses should be encouraging, informative, and focused on sustainable habits rather than quick fixes."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Response Length</h3>
            <Slider
              disabled
              defaultValue={[75]}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Concise</span>
              <span>Detailed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
