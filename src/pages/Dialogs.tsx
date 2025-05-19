
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ChatInterface from "@/components/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Plus, Calendar, Filter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for dialog placeholders
const mockDialogs = [
  {
    id: "1",
    name: "Анна Смирнова",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 19, 9, 23),
    lastMessage: "Спасибо за рекомендацию по ужину, я попробовала это блюдо!",
    unread: 2,
    status: "active"
  },
  {
    id: "2",
    name: "Иван Петров",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 14, 15),
    lastMessage: "Я хочу скорректировать свой рацион на следующую неделю",
    unread: 0,
    status: "active"
  },
  {
    id: "3",
    name: "Ольга Козлова",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 10, 5),
    lastMessage: "Бот предложил мне интересный план питания на основе моих тренировок",
    unread: 1,
    status: "active"
  },
  {
    id: "4",
    name: "Дмитрий Сидоров",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 20, 30),
    lastMessage: "Я загрузил данные со своих Apple Watch, но не вижу их в приложении",
    unread: 0,
    status: "recent"
  },
  {
    id: "5",
    name: "Елена Иванова",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 18, 42),
    lastMessage: "Как мне добавить в трекер блюда, которых нет в базе данных?",
    unread: 0,
    status: "recent"
  },
  {
    id: "6",
    name: "Сергей Морозов",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 16, 9, 15),
    lastMessage: "Благодарю за консультацию по диете!",
    unread: 0,
    status: "archived"
  },
  {
    id: "7",
    name: "Марина Соколова",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 15, 14, 30),
    lastMessage: "Всё получилось! Спасибо за помощь.",
    unread: 0,
    status: "archived"
  }
];

const Dialogs = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  
  const handleDialogClick = (dialogId: string) => {
    setSelectedDialog(dialogId);
    setOpenDrawer(true);
  };
  
  const handleCreateTicket = () => {
    toast({
      title: "Создание обращения",
      description: "Начато создание нового обращения",
      variant: "default",
    });
  };

  const filteredDialogs = useMemo(() => {
    return mockDialogs
      .filter(dialog => dialog.status === activeTab || (activeTab === "all"))
      .filter(dialog => 
        dialog.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        dialog.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, activeTab]);

  const selectedDialogData = mockDialogs.find(dialog => dialog.id === selectedDialog);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Активные";
      case "recent": return "Недавние";
      case "archived": return "Архив";
      default: return "Все";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Диалоги</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте беседами между клиентами и ботом
          </p>
        </div>
        <Button 
          onClick={handleCreateTicket}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
        >
          <Plus className="mr-2 h-4 w-4" /> Создать обращение
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="glass-morphism border-white/5 overflow-hidden h-[calc(100vh-13rem)]">
            <CardHeader className="border-b border-white/5 pb-3 space-y-4">
              <div className="flex items-center">
                <CardTitle className="flex-1">Беседы</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск диалогов..." 
                  className="pl-9 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full bg-muted/30">
                  <TabsTrigger value="active">Активные</TabsTrigger>
                  <TabsTrigger value="recent">Недавние</TabsTrigger>
                  <TabsTrigger value="archived">Архив</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <div className="overflow-y-auto h-[calc(100%-170px)]">
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {filteredDialogs.length > 0 ? filteredDialogs.map((dialog) => {
                    const initials = dialog.name
                      ? dialog.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "?";
                      
                    return (
                      <div 
                        key={dialog.id} 
                        className="p-4 flex items-center gap-4 hover:bg-muted/20 cursor-pointer transition-colors"
                        onClick={() => handleDialogClick(dialog.id)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={dialog.avatar} alt={dialog.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                          </Avatar>
                          {dialog.status === "active" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-[15px]">{dialog.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {format(dialog.timestamp, "HH:mm")}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground truncate mt-0.5">
                            {dialog.lastMessage}
                          </div>
                        </div>
                        {dialog.unread > 0 && (
                          <Badge variant="default" className="ml-2 bg-primary text-background">{dialog.unread}</Badge>
                        )}
                      </div>
                    );
                  }) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                      <p>Нет диалогов в категории "{getStatusLabel(activeTab)}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedDialogData ? (
            <Card className="glass-morphism border-white/5 h-[calc(100vh-13rem)] overflow-hidden">
              <CardHeader className="border-b border-white/5 flex flex-row items-center space-y-0 gap-4 pb-4">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={selectedDialogData.avatar} alt={selectedDialogData.name} />
                  <AvatarFallback>
                    {selectedDialogData.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{selectedDialogData.name}</CardTitle>
                  {selectedDialogData.status === "active" && (
                    <CardDescription>В сети</CardDescription>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-white/10 bg-muted/20">
                    Профиль
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-muted/20">
                    Архивировать
                  </Button>
                </div>
              </CardHeader>
              <div className="p-0 h-[calc(100%-80px)] flex flex-col">
                <div className="flex-1 overflow-auto">
                  <ChatInterface profileId={selectedDialog} />
                </div>
              </div>
            </Card>
          ) : (
            <Card className="glass-morphism border-white/5 h-[calc(100vh-13rem)] flex flex-col items-center justify-center text-center p-6">
              <MessageSquare className="h-16 w-16 mb-6 text-muted-foreground opacity-20" />
              <h3 className="text-2xl font-semibold mb-2">Выберите диалог</h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                Выберите диалог из списка слева или создайте новое обращение для начала беседы
              </p>
              <Button 
                onClick={handleCreateTicket}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Plus className="mr-2 h-4 w-4" /> Создать обращение
              </Button>
            </Card>
          )}
        </div>
      </div>

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
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
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
