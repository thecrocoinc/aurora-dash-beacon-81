
import React from "react";
import { EmptyBanner } from "@/components/EmptyBanner";
import { UserPlus } from "lucide-react";
import ProfilesTable from "./ProfilesTable";

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

interface ProfilesListProps {
  profiles: ProfileWithDetails[] | undefined;
}

/**
 * ProfilesList renders either a table of profiles or an empty state message
 */
const ProfilesList = ({ profiles }: ProfilesListProps) => {
  if (!profiles || profiles.length === 0) {
    return (
      <EmptyBanner
        icon={UserPlus}
        title="Нет клиентов с подпиской"
        subtitle="Подключите ваш Telegram-бот чтобы видеть живые данные"
      />
    );
  }

  return <ProfilesTable profiles={profiles} />;
};

export default ProfilesList;
