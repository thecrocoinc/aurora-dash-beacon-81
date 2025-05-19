
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ChatInterface from "@/components/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data for dialog placeholders
const mockDialogs = [
  {
    id: "1",
    name: "Анна Смирнова",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 19, 9, 23),
    lastMessage: "Спасибо за рекомендацию по ужину, я попробовала это блюдо!",
    unread: 2
  },
  {
    id: "2",
    name: "Иван Петров",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 14, 15),
    lastMessage: "Я хочу скорректировать свой рацион на следующую неделю",
    unread: 0
  },
  {
    id: "3",
    name: "Ольга Козлова",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 10, 5),
    lastMessage: "Бот предложил мне интересный план питания на основе моих тренировок",
    unread: 1
  },
  {
    id: "4",
    name: "Дмитрий Сидоров",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 20, 30),
    lastMessage: "Я загрузил данные со своих Apple Watch, но не вижу их в приложении",
    unread: 0
  },
  {
    id: "5",
    name: "Елена Иванова",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 18, 42),
    lastMessage: "Как мне добавить в трекер блюда, которых нет в базе данных?",
    unread: 0
  }
];

const Dialogs = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  
  const handleDialogClick = (dialogId: string) => {
    setSelectedDialog(dialogId);
    setOpenDrawer(true);
  };
  
  const handlePingBot = () => {
    toast({
      title: "Бот активирован",
      description: "Бот начал работу с новым клиентом.",
    });
  };

  const selectedDialogData = mockDialogs.find(dialog => dialog.id === selectedDialog);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Диалоги</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте беседами между клиентами и ботом
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
          Создать обращение
        </Button>
      </div>
      
      <Card className="glass-morphism border-white/5">
        <CardHeader>
          <CardTitle>Недавние беседы</CardTitle>
          <CardDescription>Просмотр и управление диалогами клиентов с ботом</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 divide-y divide-white/5">
            {mockDialogs.map((dialog) => {
              const initials = dialog.name
                ? dialog.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "?";
                
              return (
                <div 
                  key={dialog.id} 
                  className="p-3 -mx-3 flex items-center gap-4 hover:bg-muted rounded-md cursor-pointer transition-colors"
                  onClick={() => handleDialogClick(dialog.id)}
                >
                  <Avatar>
                    <AvatarImage src={dialog.avatar} alt={dialog.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{dialog.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(dialog.timestamp, "HH:mm")}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {dialog.lastMessage}
                    </div>
                  </div>
                  {dialog.unread > 0 && (
                    <Badge variant="default" className="ml-2 bg-primary text-white">{dialog.unread}</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>{selectedDialogData?.name || "Чат"}</DrawerTitle>
          </DrawerHeader>
          <div className="p-0 h-[calc(100%-60px)] flex flex-col">
            <div className="flex-1">
              <ChatInterface profileId={selectedDialog || undefined} />
            </div>
            <div className="p-4 border-t">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                Написать ответ
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Dialogs;
