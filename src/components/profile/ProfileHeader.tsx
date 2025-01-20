import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

interface ProfileHeaderProps {
  username: string;
  bio: string;
  avatarUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  bio,
  avatarUrl = "https://github.com/shadcn.png"
}) => {
  return (
    <div className="flex items-center gap-6 mb-8 p-6 bg-white rounded-xl shadow-sm">
      <Avatar className="h-24 w-24 border-2 border-gray-100">
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {username}
        </h1>
        <p className="text-gray-600 max-w-md">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;