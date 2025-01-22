import React from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "../components/post/Navigation";
import NewPostForm from "../components/post/NewPostForm";
import PostDetailView from "../components/post/PostDetailView";
import PostDetailEdit from "../components/post/PostDetailEdit";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import useProfileData from "../hooks/useProfileData";
import { Post } from "../types/post";

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

const Profile: React.FC = () => {
  const { userId } = useParams();
  const {
    showNewDashboard,
    selectedPost,
    posts,
    savedPosts,
    setShowNewDashboard,
    setSelectedPost,
    handleSavePost,
  } = useProfileData(initialUserPosts);

  const isCurrentUserProfile = !userId || userId === "1"; // Assuming "1" is the current user's ID

  const renderContent = () => {
    if (showNewDashboard) {
      return <NewPostForm onClose={() => setShowNewDashboard(false)} />;
    }

    if (selectedPost) {
      const isCurrentUserPost = selectedPost.authorId === "1"; // Assuming "1" is the current user's ID
      return (
        <div className="bg-white rounded-lg p-6">
          {isCurrentUserPost ? (
            <PostDetailEdit
              currentPost={selectedPost}
              editedTitle={selectedPost.title}
              editedDescription={selectedPost.description}
              editedLocation={selectedPost.location}
              setEditedTitle={() => {}}
              setEditedDescription={() => {}}
              setEditedLocation={() => {}}
              handleSaveEdit={() => {}}
              setIsEditing={() => {}}
              handleBookmark={() => {}}
              onClose={() => setSelectedPost(null)}
            />
          ) : (
            <PostDetailView
              currentPost={selectedPost}
              handleSaveEdit={() => {}}
              setIsEditing={() => {}}
              handleBookmark={() => {}}
              onClose={() => setSelectedPost(null)}
              isCurrentUserPost={isCurrentUserPost}
            />
          )}
        </div>
      );
    }

    return (
      <div className="max-w-screen-xl mx-auto space-y-6">
        <ProfileHeader 
          username={isCurrentUserProfile ? "@travelblogger" : `@user${userId}`}
          bio={isCurrentUserProfile ? "Exploring the world one city at a time" : "Another travel enthusiast"}
        />
        <ProfileTabs
          posts={posts}
          savedPosts={isCurrentUserProfile ? savedPosts : []}
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
        onProfileClick={() => setSelectedPost(null)}
      />
      <main className="pt-20 pb-12 px-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default Profile;