
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      <p className="text-muted-foreground">
        Details for user ID: {id}
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Personal details and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p>User ID: {id}</p>
          <p>Detailed profile information would appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
