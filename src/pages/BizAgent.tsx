
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  tooltip?: string;
};

const FeatureCard = ({ icon, title, description, tooltip }: FeatureCardProps) => {
  const card = (
    <Card className="rounded-2xl shadow hover:scale-105 transition duration-300">
      <CardContent className="p-6">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {card}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return card;
};

const BizAgent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Бизнес-центр</h1>
      <p className="text-muted-foreground">
        Управление, оптимизация и рост вашего бизнеса нутрициологии.
      </p>
      
      <Tabs defaultValue="tools">
        <TabsList className="mb-4">
          <TabsTrigger value="tools">Инструменты</TabsTrigger>
          <TabsTrigger value="revenue">Доходность</TabsTrigger>
          <TabsTrigger value="automation">Автоматизация</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon="⚡" 
              title="Генерация контента" 
              description="Создание персонализированных планов питания и рекомендаций" 
            />
            <FeatureCard 
              icon="📈" 
              title="Маркетинг" 
              description="Автоматизация рассылок и кампаний для привлечения клиентов" 
            />
            <FeatureCard 
              icon="🔄" 
              title="Голосовой помощник" 
              description="Управление бизнесом с помощью голосовых команд"
              tooltip="Нажмите ⌘K – Скоро будет доступно"
            />
            <FeatureCard 
              icon="💰" 
              title="Монетизация" 
              description="Инструменты для создания и продажи премиум-предложений" 
            />
            <FeatureCard 
              icon="📊" 
              title="Аналитика" 
              description="Отчеты и инсайты для оптимизации бизнес-процессов" 
            />
            <FeatureCard 
              icon="🤖" 
              title="AI-ассистент" 
              description="Персональный помощник для автоматизации рутинных задач" 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Доходность и конверсия</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-10">
                Скоро здесь появятся детальные отчеты о доходности и конверсии. Оставайтесь на связи!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Автоматизация бизнес-процессов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-10">
                Скоро здесь появятся инструменты для автоматизации бизнес-процессов. Оставайтесь на связи!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BizAgent;
