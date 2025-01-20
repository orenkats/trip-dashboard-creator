import { useState } from "react";
import { Dashboard } from "@/components/dashboard/types";
import { PostList } from "@/components/dashboard/PostList";
import { User, Grid, Bookmark } from "lucide-react";
import { Navigation } from "@/components/dashboard/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardForm from "@/components/dashboard/DashboardForm";

const Profile = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  
  // Mock data for user's posts
  const [userPosts, setUserPosts] = useState<Dashboard[]>([
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
  ]);

  // Mock data for saved posts
  const savedPosts: Dashboard[] = [
    {
      id: "saved-1",
      title: "Hidden Gems in Rome",
      description: "Secret spots in the eternal city",
      coverPhoto: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      location: "Rome, Italy",
      authorId: "2",
      authorUsername: "@italyexplorer",
      createdAt: new Date().toISOString(),
      subTopics: [],
      savedCount: 128,
      isSaved: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation onNewPost={() => setShowNewDashboard(true)} />
      
      {showNewDashboard ? (
        <DashboardForm 
          onClose={() => setShowNewDashboard(false)} 
        />
      ) : (
        <>
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
                      <span className="font-semibold">{savedPosts.length}</span>
                      <span className="text-gray-600 ml-1">saved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="max-w-screen-xl mx-auto px-4">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mt-4">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <Grid size={16} />
                  Posts
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Bookmark size={16} />
                  Saved
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-6">
                <PostList posts={userPosts} onPostClick={() => {}} />
              </TabsContent>
              <TabsContent value="saved" className="mt-6">
                <PostList posts={savedPosts} onPostClick={() => {}} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;