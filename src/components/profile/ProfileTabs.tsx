import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PostList } from "../dashboard/PostList";
import { Post } from "../../types/dashboard";

interface ProfileTabsProps {
  posts: Post[];
  savedPosts: Post[];
  onPostClick: (post: Post) => void;
  onSavePost: (post: Post) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  posts,
  savedPosts,
  onPostClick,
  onSavePost,
}) => {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
        <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="mt-6">
        <PostList 
          posts={posts} 
          onPostClick={onPostClick}
          onSavePost={onSavePost}
        />
      </TabsContent>
      <TabsContent value="saved" className="mt-6">
        <PostList 
          posts={savedPosts} 
          onPostClick={onPostClick}
          onSavePost={onSavePost}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;