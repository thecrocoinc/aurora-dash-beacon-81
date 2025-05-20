
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
  subscription_status?: 'active' | 'trial' | 'expired';
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
            <TableHead className="w-[250px]">Клиент</TableHead>
            <TableHead className="w-[100px]">Тариф</TableHead>
            <TableHead className="w-[120px]">Цель</TableHead>
            <TableHead className="text-right w-[250px]">Прогресс</TableHead>
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
