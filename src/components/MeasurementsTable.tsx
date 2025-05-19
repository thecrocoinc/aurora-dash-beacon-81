
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Measurement {
  id: string;
  profile_id: string;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  arms: number | null;
  thighs: number | null;
  recorded_at: string;
}

interface MeasurementsTableProps {
  profileId: string;
}

export const MeasurementsTable: React.FC<MeasurementsTableProps> = ({ profileId }) => {
  const { data: measurements, isLoading } = useQuery({
    queryKey: ['measurements', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .eq('profile_id', profileId)
        .order('recorded_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching measurements:", error);
        throw error;
      }
      
      return data as Measurement[];
    },
    enabled: !!profileId
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  if (!measurements || measurements.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Нет данных об измерениях</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead>Грудь (см)</TableHead>
            <TableHead>Талия (см)</TableHead>
            <TableHead>Бедра (см)</TableHead>
            <TableHead>Руки (см)</TableHead>
            <TableHead>Ноги (см)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {measurements.map((measurement) => (
            <TableRow key={measurement.id}>
              <TableCell>
                {format(parseISO(measurement.recorded_at), 'd MMM yyyy', { locale: ru })}
              </TableCell>
              <TableCell>{measurement.chest ?? '—'}</TableCell>
              <TableCell>{measurement.waist ?? '—'}</TableCell>
              <TableCell>{measurement.hips ?? '—'}</TableCell>
              <TableCell>{measurement.arms ?? '—'}</TableCell>
              <TableCell>{measurement.thighs ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
