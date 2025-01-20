import React, { useState } from "react";
import { Navigation } from "../components/dashboard/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import NewPostForm from "../components/dashboard/NewPostForm";
import { PostDetail } from "../components/dashboard/PostDetail";
import { PostList } from "../components/dashboard/PostList";
import { usePostManagement } from "../hooks/usePostManagement";
import { Post, SubTopicType } from "../types/dashboard";

const initialUserPosts: Post[] = [
  {
    id: "user-post-1",
    title: "My Trip to Paris",
    description: "Exploring the city of lights",
    coverPhoto: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    location: "Paris, France",
    authorId: "1",
    authorUsername: "@currentuser",
    createdAt: new Date().toISOString(),
    subTopics: [
      {
        id: "st1",
        type: "Restaurants" as SubTopicType,
        places: [
          {
            id: "p1",
            name: "Le Petit Bistro",
            location: "Montmartre",
            notes: "Amazing French cuisine",
            photos: []
          }
        ]
      }
    ],
    savedCount: 45,
    isSaved: false,
    comments: []
  }
];

const Profile = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { posts, savedPosts, handleSavePost } = usePostManagement(initialUserPosts);

  const handleNavigationClick = () => {
    if (selectedPost) {
      setSelectedPost(null);
    }
  };

  const renderContent = () => {
    if (showNewDashboard) {
      return <NewPostForm onClose={() => setShowNewDashboard(false)} />;
    }

    if (selectedPost) {
      return (
        <PostDetail 
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      );
    }

    return (
      <div className="max-w-screen-xl mx-auto">
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

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <PostList 
              posts={posts} 
              onPostClick={setSelectedPost}
              onSavePost={handleSavePost}
            />
          </TabsContent>
          <TabsContent value="saved" className="mt-6">
            <PostList 
              posts={savedPosts} 
              onPostClick={setSelectedPost}
              onSavePost={handleSavePost}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation 
        onNewPost={() => setShowNewDashboard(true)} 
        onProfileClick={handleNavigationClick}
      />
      <main className="pt-20 pb-12 px-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default Profile;