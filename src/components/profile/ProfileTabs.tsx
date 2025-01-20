import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PostList } from "../dashboard/PostList";
import { Post } from "../../types/dashboard";
import { Card } from '../ui/card';

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
  const renderPostList = (posts: Post[]) => (
    <Card className="p-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No posts to display</p>
      ) : (
        <PostList 
          posts={posts} 
          onPostClick={onPostClick}
          onSavePost={onSavePost}
        />
      )}
    </Card>
  );

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full justify-start mb-6">
        <TabsTrigger value="posts" className="flex-1">
          My Posts ({posts.length})
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex-1">
          Saved ({savedPosts.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts">
        {renderPostList(posts)}
      </TabsContent>
      
      <TabsContent value="saved">
        {renderPostList(savedPosts)}
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;