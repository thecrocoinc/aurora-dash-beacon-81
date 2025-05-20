
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProfilesLoadingProps {
  viewMode: "list" | "grid";
}

const ProfilesLoading = ({ viewMode }: ProfilesLoadingProps) => {
  // Since we're only using list view now, simplify by always showing list loading state
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[170px] w-[25%]">Клиент</TableHead>
            <TableHead className="w-[15%]">Тариф</TableHead>
            <TableHead className="w-[25%]">Цель</TableHead>
            <TableHead className="text-right w-[35%] min-w-[200px]">Прогресс</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5).fill(0).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-end gap-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2 w-full" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfilesLoading;
