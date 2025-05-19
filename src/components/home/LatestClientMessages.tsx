
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

interface LatestMessage {
  profile_id: string;
  ts: string;
  last_message: string;
  name: string;
  avatar_url: string | null;
}

export const LatestClientMessages = () => {
  const { data: latestMessages, isLoading } = useQuery({
    queryKey: ['latest-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_latest_messages_by_profile');
      
      if (error) {
        console.error("Error fetching latest messages:", error);
        throw error;
      }
      
      return data as LatestMessage[];
    },
    refetchInterval: 1000 * 60 * 5, // Refresh every 5 minutes
  });

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, "HH:mm", { locale: ru });
    }
    return format(date, "d MMM, HH:mm", { locale: ru });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const truncateMessage = (message: string, maxLength = 60) => {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + "...";
    }
    return message;
  };

  return (
    <Card className="shadow-md border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-zinc-800">
        <CardTitle className="text-lg">Недавние сообщения</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : !latestMessages || latestMessages.length === 0 ? (
          <div className="text-center p-6 text-zinc-400">
            <p>Пока нет сообщений от клиентов</p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {latestMessages.map((message) => (
              <li key={message.profile_id}>
                <Link 
                  to={`/profiles/${message.profile_id}`} 
                  className="flex items-start gap-3 p-4 hover:bg-zinc-800/40 transition-colors"
                >
                  <Avatar className="h-10 w-10 border border-zinc-700">
                    <AvatarImage 
                      src={message.avatar_url ? `${message.avatar_url}?w=40&h=40&fit=crop&crop=faces` : undefined} 
                      alt={message.name} 
                    />
                    <AvatarFallback>{getInitials(message.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium text-sm truncate">{message.name}</p>
                      <span className="text-xs text-zinc-400 flex-shrink-0">
                        {formatMessageDate(message.ts)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 line-clamp-1">
                      {truncateMessage(message.last_message)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
