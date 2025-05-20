
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProfileTableRow from "./ProfileTableRow";

interface ProfileWithDetails {
  id: string;
  name: string;
  avatar: string | null;
  watch_connected: boolean;
  kcalRatio: number;
  currentKcal: number;
  dailyGoal: number;
  prot: number;
  fat: number;
  carb: number;
  goal_type?: string | null;
  created_at?: string | null;
  last_activity?: string | null;
  streak_days?: number;
  subscription_status?: string;
}

interface ProfilesTableProps {
  profiles: ProfileWithDetails[];
}

/**
 * ProfilesTable renders a table with profile data
 */
const ProfilesTable = ({ profiles }: ProfilesTableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px] w-[25%]">Клиент</TableHead>
            <TableHead className="w-[15%]">Тариф</TableHead>
            <TableHead className="w-[25%]">Цель</TableHead>
            <TableHead className="text-right w-[35%] min-w-[220px]">Прогресс</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <ProfileTableRow key={profile.id} profile={profile} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfilesTable;
