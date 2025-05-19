
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ChatInterface from "@/components/ChatInterface";

type ChatTabProps = {
  profileId?: string;
};

const ChatTab = ({ profileId }: ChatTabProps) => {
  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle>Коучинг по питанию</CardTitle>
        <CardDescription>Общение с тренером</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-96px)]">
        <ChatInterface profileId={profileId} />
      </CardContent>
    </Card>
  );
};

export default ChatTab;
