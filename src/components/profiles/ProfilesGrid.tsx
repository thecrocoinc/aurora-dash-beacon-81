
import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import { EmptyBanner } from "@/components/EmptyBanner";
import { UserPlus } from "lucide-react";

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
  subscription_status?: 'active' | 'expired' | 'trial';
}

interface ProfilesGridProps {
  profiles: ProfileWithDetails[] | undefined;
}

const ProfilesGrid = ({ profiles }: ProfilesGridProps) => {
  if (!profiles || profiles.length === 0) {
    return (
      <EmptyBanner
        icon={UserPlus}
        title="Нет клиентов"
        subtitle="Подключите ваш Telegram-бот чтобы видеть живые данные"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map((profile) => (
        <Link key={profile.id} to={`/profiles/${profile.id}`} className="block h-full">
          <ProfileCard profile={profile} />
        </Link>
      ))}
    </div>
  );
};

export default ProfilesGrid;
