
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
  subscription_status?: 'active' | 'trial';
}

interface ProfilesGridProps {
  profiles: ProfileWithDetails[] | undefined;
}

const ProfilesGrid = ({ profiles }: ProfilesGridProps) => {
  // Only show profiles with paid subscriptions
  const paidProfiles = profiles?.filter(profile => 
    profile.subscription_status === 'active' || profile.subscription_status === 'trial'
  );
  
  if (!paidProfiles || paidProfiles.length === 0) {
    // Generate placeholder profiles for demonstration - only with paid subscriptions
    const placeholderProfiles = Array.from({ length: 12 }, (_, i) => ({
      id: `placeholder-${i}`,
      name: ["Анна Иванова", "Максим Петров", "Елена Сидорова", "Алексей Смирнов", 
             "Ольга Козлова", "Дмитрий Попов", "Наталья Волкова", "Сергей Соколов", 
             "Юлия Морозова", "Иван Новиков", "Екатерина Морозова", "Андрей Соловьев"][i % 12],
      avatar: null,
      watch_connected: i % 3 === 0,
      kcalRatio: Math.random() * 0.9 + 0.1, // Random between 0.1 and 1.0
      currentKcal: Math.floor(Math.random() * 1500) + 500,
      dailyGoal: 2000,
      prot: Math.floor(Math.random() * 60) + 40,
      fat: Math.floor(Math.random() * 40) + 30,
      carb: Math.floor(Math.random() * 150) + 100,
      goal_type: ["weight_loss", "weight_gain", "maintenance"][i % 3],
      created_at: new Date().toISOString(),
      last_activity: new Date().toISOString(),
      streak_days: Math.floor(Math.random() * 30),
      subscription_status: i % 2 === 0 ? 'active' : 'trial' as 'active' | 'trial'
    }));

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {placeholderProfiles.map((profile) => (
          <div key={profile.id} className="block h-full">
            <ProfileCard profile={profile} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {paidProfiles.map((profile) => (
        <Link 
          key={profile.id} 
          to={`/profiles/${profile.id}`} 
          className="block h-full"
        >
          <ProfileCard profile={profile} />
        </Link>
      ))}
    </div>
  );
};

export default ProfilesGrid;
