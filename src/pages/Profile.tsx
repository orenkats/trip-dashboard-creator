import { Dashboard } from "@/components/dashboard/types";
import { PostList } from "@/components/dashboard/PostList";
import { User } from "lucide-react";
import { Navigation } from "@/components/dashboard/Navigation";

const Profile = () => {
  // Mock data for user's posts
  const userPosts: Dashboard[] = [
    {
      id: "user-post-1",
      title: "My Trip to Paris",
      description: "Exploring the city of lights",
      coverPhoto: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      location: "Paris, France",
      authorId: "1", // Current user
      authorUsername: "@currentuser",
      createdAt: new Date().toISOString(),
      subTopics: [],
      savedCount: 45,
      isSaved: false
    },
    {
      id: "user-post-2",
      title: "Venice Adventures",
      description: "Getting lost in Venice's narrow streets",
      coverPhoto: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      location: "Venice, Italy",
      authorId: "1", // Current user
      authorUsername: "@currentuser",
      createdAt: new Date().toISOString(),
      subTopics: [],
      savedCount: 32,
      isSaved: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation />
      
      {/* Profile Header */}
      <div className="bg-white border-b mt-16">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">@currentuser</h1>
              <p className="text-gray-600 mt-1">Travel enthusiast | Photography lover</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="font-semibold">{userPosts.length}</span>
                  <span className="text-gray-600 ml-1">posts</span>
                </div>
                <div>
                  <span className="font-semibold">124</span>
                  <span className="text-gray-600 ml-1">saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">My Travel Stories</h2>
        <PostList posts={userPosts} onPostClick={() => {}} />
      </div>
    </div>
  );
};

export default Profile;