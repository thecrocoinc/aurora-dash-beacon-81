
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Select a menu item from the sidebar to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          className="w-full" 
          onClick={() => navigate('/profiles')}
        >
          Go to Profiles
        </Button>
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => navigate('/dialogs')}
        >
          Go to Dialogs
        </Button>
      </CardContent>
    </Card>
  );
};

export default Home;
