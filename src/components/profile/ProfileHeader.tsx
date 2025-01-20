import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const ProfileHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold">@travelblogger</h1>
        <p className="text-gray-500">Exploring the world one city at a time</p>
      </div>
    </div>
  );
};

export default ProfileHeader;