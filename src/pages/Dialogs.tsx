
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ChatInterface from "@/components/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data for dialog placeholders
const mockDialogs = [
  {
    id: "1",
    name: "Анна Смирнова",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 19, 9, 23),
    lastMessage: "Спасибо за рекомендацию по ужину, я попробовала это блюдо!",
    unread: 2,
    isActive: true
  },
  {
    id: "2",
    name: "Иван Петров",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 14, 15),
    lastMessage: "Я хочу скорректировать свой рацион на следующую неделю",
    unread: 0,
    isActive: false
  },
  {
    id: "3",
    name: "Ольга Козлова",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 10, 5),
    lastMessage: "Бот предложил мне интересный план питания на основе моих тренировок",
    unread: 1,
    isActive: true
  },
  {
    id: "4",
    name: "Дмитрий Сидоров",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 20, 30),
    lastMessage: "Я загрузил данные со своих Apple Watch, но не вижу их в приложении",
    unread: 0,
    isActive: false
  },
  {
    id: "5",
    name: "Елена Иванова",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 18, 42),
    lastMessage: "Как мне добавить в трекер блюда, которых нет в базе данных?",
    unread: 0,
    isActive: false
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
  
  // Format timestamp with relative time
  const formatTime = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    // Using colon format for time
    return isToday ? format(date, "HH:mm") : format(date, "dd.MM");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Диалоги</h1>
        <p className="text-muted-foreground mt-2">
          Управляйте беседами между клиентами и ботом
        </p>
      </div>
      
      <Card className="glass-morphism border-white/5 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
          <div>
            <CardTitle>Недавние беседы</CardTitle>
            <CardDescription>Просмотр и управление диалогами клиентов с ботом</CardDescription>
          </div>
          <div className="relative w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="search"
              placeholder="Поиск диалогов..."
              className="w-full rounded-md border border-white/10 bg-black/20 py-2 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
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
                  className={`h-[72px] p-4 flex items-center gap-4 hover:bg-muted/30 cursor-pointer transition-colors ${dialog.id === selectedDialog ? 'bg-muted/50' : ''}`}
                  onClick={() => handleDialogClick(dialog.id)}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={dialog.avatar} alt={dialog.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    {dialog.isActive && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                    <div className="flex justify-between items-center">
                      <div className="font-medium truncate max-w-[180px]">{dialog.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(dialog.timestamp)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground truncate max-w-full">
                      {dialog.lastMessage}
                    </div>
                    {dialog.unread > 0 && (
                      <div className="flex justify-end mt-1">
                        <Badge className="h-5 min-w-5 flex items-center justify-center bg-primary text-white rounded-full px-1.5 py-0">
                          {dialog.unread}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {mockDialogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-1">Нет диалогов</h3>
              <p className="text-sm text-muted-foreground">Создайте новое обращение или подождите, пока клиенты не начнут общаться.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle className="flex items-center gap-3">
              {selectedDialogData && (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedDialogData.avatar} alt={selectedDialogData.name} />
                    <AvatarFallback>
                      {selectedDialogData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{selectedDialogData.name}</span>
                  {selectedDialogData.isActive && (
                    <span className="badge-status badge-status-active text-xs text-muted-foreground">
                      Онлайн
                    </span>
                  )}
                </>
              )}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-0 h-[calc(100%-60px)] flex flex-col">
            <div className="flex-1">
              <ChatInterface profileId={selectedDialog || undefined} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Dialogs;
