
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface WeightLog {
  id: string;
  profile_id: string;
  weight: number;
  recorded_at: string;
  notes?: string | null;
}

interface WeightHistoryChartProps {
  profileId: string;
  targetWeight?: number | null;
}

export const WeightHistoryChart: React.FC<WeightHistoryChartProps> = ({ profileId, targetWeight }) => {
  const { data: weightLogs, isLoading } = useQuery({
    queryKey: ['weight-logs', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('profile_id', profileId)
        .order('recorded_at', { ascending: true });
      
      if (error) {
        console.error("Error fetching weight logs:", error);
        throw error;
      }
      
      return data as WeightLog[];
    },
    enabled: !!profileId
  });

  const chartData = React.useMemo(() => {
    if (!weightLogs) return [];
    
    return weightLogs.map(log => ({
      date: format(parseISO(log.recorded_at), 'd MMM', { locale: ru }),
      weight: log.weight,
      fullDate: log.recorded_at,
      notes: log.notes
    }));
  }, [weightLogs]);

  // Add target weight to chart data if provided
  const dataWithTarget = React.useMemo(() => {
    if (!targetWeight || !chartData.length) return chartData;
    
    return chartData.map(item => ({
      ...item,
      target: targetWeight
    }));
  }, [chartData, targetWeight]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-md p-3 shadow-lg">
          <p className="font-medium">{format(parseISO(data.fullDate), 'd MMMM yyyy', { locale: ru })}</p>
          <p className="text-sm">Вес: <span className="font-medium">{data.weight} кг</span></p>
          {data.notes && <p className="text-xs mt-1 text-muted-foreground">{data.notes}</p>}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <div className="h-[300px] w-full">
      {!chartData.length ? (
        <div className="h-full flex items-center justify-center text-center">
          <p className="text-muted-foreground">Нет данных о весе</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataWithTarget} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#34d399" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }}
            />
            {targetWeight && (
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#94a3b8" 
                strokeDasharray="4 4" 
                strokeWidth={1} 
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
