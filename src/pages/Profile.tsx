import React from "react";
import { Navigation } from "../components/dashboard/Navigation";
import NewPostForm from "../components/dashboard/NewPostForm";
import { PostDetail } from "../components/dashboard/PostDetail";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import { useProfileData } from "../hooks/useProfileData";
import { Post } from "../types/dashboard";

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
        type: "Restaurants",
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
  const {
    showNewDashboard,
    setShowNewDashboard,
    selectedPost,
    setSelectedPost,
    posts,
    savedPosts,
    handleSavePost,
  } = useProfileData(initialUserPosts);

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
        <ProfileHeader />
        <ProfileTabs
          posts={posts}
          savedPosts={savedPosts}
          onPostClick={setSelectedPost}
          onSavePost={handleSavePost}
        />
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