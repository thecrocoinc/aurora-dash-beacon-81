
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fakeProfiles, fakeMeals } from "@/utils/dummy";
import KcalRing from "@/components/KcalRing";
import MealTile from "@/components/MealTile";
import ChatInterface from "@/components/ChatInterface";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  
  const profile = fakeProfiles.find(p => p.id === id);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">
          Profile not found for ID: {id}
        </p>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`${profile.avatar}?w=160&h=160&fit=crop&crop=faces`} alt={profile.name} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
            <p className="text-muted-foreground">ID: {profile.id}</p>
          </div>
        </div>
        <Select defaultValue={profile.goalType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Goal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lose">Lose Weight</SelectItem>
            <SelectItem value="Gain">Gain Weight</SelectItem>
            <SelectItem value="Maintain">Maintain Weight</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Nutrition</CardTitle>
                <CardDescription>Calorie intake progress</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <KcalRing value={profile.currentKcal} target={profile.dailyGoal} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Meals</CardTitle>
                <CardDescription>Logged food items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {fakeMeals.map(meal => (
                    <MealTile key={meal.id} meal={meal} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="chat" className="mt-6">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Nutrition Coaching</CardTitle>
              <CardDescription>Chat with your nutrition coach</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-96px)]">
              <ChatInterface />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDetail;
