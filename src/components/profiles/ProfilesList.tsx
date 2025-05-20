
import React from "react";
import { EmptyBanner } from "@/components/EmptyBanner";
import { UserPlus } from "lucide-react";
import ProfilesTable from "./ProfilesTable";
import { ProfileWithDetails } from "@/types/profile";

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

  return (
    <div className="w-full">
      <ProfilesTable profiles={profiles} />
    </div>
  );
};

export default ProfilesList;
