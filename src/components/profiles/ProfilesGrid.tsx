
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
  subscription_status?: 'active' | 'trial' | 'expired';
}

interface ProfilesGridProps {
  profiles: ProfileWithDetails[] | undefined;
}

const ProfilesGrid = ({ profiles }: ProfilesGridProps) => {
  // Убираем повторную фильтрацию, так как она уже происходит в родительском компоненте
  // и используем профили напрямую
  
  if (!profiles || profiles.length === 0) {
    // Generate 15 realistic placeholder profiles for demonstration
    const russianNames = [
      "Анна Иванова", "Максим Петров", "Елена Сидорова", "Алексей Смирнов", 
      "Ольга Козлова", "Дмитрий Попов", "Наталья Волкова", "Сергей Соколов", 
      "Юлия Морозова", "Иван Новиков", "Екатерина Кузнецова", "Андрей Соловьев",
      "Мария Лебедева", "Артём Комаров", "Татьяна Орлова", "Павел Ковалев", 
      "Светлана Зайцева", "Роман Макаров", "Ксения Белова", "Владислав Миронов"
    ];
    
    // Real unsplash avatar URLs
    const avatarUrls = [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      "https://images.unsplash.com/photo-1548142813-c348350df52b",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
      "https://images.unsplash.com/photo-1610261003803-224ee66747e1",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      null, // Some users without avatar
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c",
      "https://images.unsplash.com/photo-1557296387-5358ad7997bb"
    ];

    // Define different goal types and their probabilities
    const goalTypes = [
      { type: "weight_loss", probability: 0.5 },
      { type: "weight_gain", probability: 0.2 },
      { type: "maintenance", probability: 0.3 }
    ];
    
    // Generate 15 detailed placeholder profiles
    const placeholderProfiles = Array.from({ length: 15 }, (_, i) => {
      // Randomize subscription status with specific distribution
      // 40% premium, 60% basic
      const subscriptionStatus = Math.random() < 0.4 ? 'active' : 'trial' as 'active' | 'trial';
      
      // Randomized calorie goals based on the goal type
      const goalTypeRandom = Math.random();
      let cumulativeProbability = 0;
      let selectedGoalType = "maintenance";
      
      for (const goal of goalTypes) {
        cumulativeProbability += goal.probability;
        if (goalTypeRandom <= cumulativeProbability) {
          selectedGoalType = goal.type;
          break;
        }
      }
      
      // Set daily goal based on goal type
      let dailyGoal = 2000;
      switch(selectedGoalType) {
        case "weight_loss":
          dailyGoal = Math.floor(Math.random() * 400) + 1600; // 1600-2000 kcal
          break;
        case "weight_gain":
          dailyGoal = Math.floor(Math.random() * 600) + 2400; // 2400-3000 kcal
          break;
        case "maintenance":
          dailyGoal = Math.floor(Math.random() * 400) + 2000; // 2000-2400 kcal
          break;
      }
      
      // Create more realistic progress - users with weight loss tend to have lower progress
      let progressFactor;
      if (selectedGoalType === "weight_loss") {
        progressFactor = Math.random() * 0.4 + 0.5; // 50-90%
      } else if (selectedGoalType === "weight_gain") {
        progressFactor = Math.random() * 0.3 + 0.6; // 60-90%
      } else {
        progressFactor = Math.random() * 0.2 + 0.7; // 70-90%
      }
      
      const currentKcal = Math.floor(dailyGoal * progressFactor);
      
      // Calculate realistic macros based on goal type
      let protPercentage, fatPercentage, carbPercentage;
      
      if (selectedGoalType === "weight_loss") {
        protPercentage = 0.3 + Math.random() * 0.1; // 30-40%
        fatPercentage = 0.25 + Math.random() * 0.1; // 25-35%
        carbPercentage = 1 - protPercentage - fatPercentage; // Remaining for carbs
      } else if (selectedGoalType === "weight_gain") {
        protPercentage = 0.25 + Math.random() * 0.1; // 25-35%
        fatPercentage = 0.2 + Math.random() * 0.1; // 20-30%
        carbPercentage = 1 - protPercentage - fatPercentage; // Remaining for carbs
      } else {
        protPercentage = 0.2 + Math.random() * 0.1; // 20-30%
        fatPercentage = 0.25 + Math.random() * 0.1; // 25-35%
        carbPercentage = 1 - protPercentage - fatPercentage; // Remaining for carbs
      }
      
      const prot = Math.floor((currentKcal * protPercentage) / 4); // 4 calories per gram
      const fat = Math.floor((currentKcal * fatPercentage) / 9);   // 9 calories per gram
      const carb = Math.floor((currentKcal * carbPercentage) / 4); // 4 calories per gram
      
      // More realistic streak days (most people don't have perfect streaks)
      const streakType = Math.random();
      let streakDays;
      
      if (streakType < 0.6) {
        // 60% have short streaks (1-7 days)
        streakDays = Math.floor(Math.random() * 7) + 1;
      } else if (streakType < 0.9) {
        // 30% have medium streaks (8-21 days)
        streakDays = Math.floor(Math.random() * 14) + 8;
      } else {
        // 10% have long streaks (22-45 days)
        streakDays = Math.floor(Math.random() * 24) + 22;
      }
      
      // Create different registration dates - some new, some older
      const daysAgo = Math.floor(Math.random() * 60) + 1; // 1-60 days ago
      const registrationDate = new Date();
      registrationDate.setDate(registrationDate.getDate() - daysAgo);
      
      // Last activity - more active users tend to have better progress
      const lastActivityDaysAgo = progressFactor > 0.8 ? 
        Math.floor(Math.random() * 2) : // Very recent for active users (0-1 days)
        Math.floor(Math.random() * 5) + 1; // 1-5 days for less active
      
      const lastActivityDate = new Date();
      lastActivityDate.setDate(lastActivityDate.getDate() - lastActivityDaysAgo);
      
      // Watch connection more likely for premium users
      const hasWatch = subscriptionStatus === 'active' ? 
        Math.random() > 0.3 : // 70% of premium have watches
        Math.random() > 0.7;  // Only 30% of basic users have watches

      return {
        id: `demo-profile-${i}`,
        name: russianNames[i % russianNames.length],
        avatar: avatarUrls[i % avatarUrls.length],
        watch_connected: hasWatch,
        kcalRatio: progressFactor,
        currentKcal: currentKcal,
        dailyGoal: dailyGoal,
        prot: prot,
        fat: fat,
        carb: carb,
        goal_type: selectedGoalType,
        created_at: registrationDate.toISOString(),
        last_activity: lastActivityDate.toISOString(),
        streak_days: streakDays,
        subscription_status: subscriptionStatus
      };
    });

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
      {profiles.map((profile) => (
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
