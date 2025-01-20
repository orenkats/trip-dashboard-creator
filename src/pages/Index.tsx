import { useState } from "react";
import { Dashboard } from "@/components/dashboard/types";
import { Button } from "@/components/ui/button";
import { Plus, Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardForm from "@/components/dashboard/DashboardForm";
import { PostList } from "@/components/dashboard/PostList";
import { PostDetail } from "@/components/dashboard/PostDetail";

const Index = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Dashboard | null>(null);
  
  // Mock data with multiple photos per place
  const mockDashboards: Dashboard[] = [
    {
      id: "1",
      title: "Hidden Gems in Rome",
      description: "My favorite spots in the eternal city",
      coverPhoto: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      location: "Rome, Italy",
      authorId: "2", // Different user
      authorUsername: "@italyexplorer",
      createdAt: new Date().toISOString(),
      subTopics: [
        {
          id: "st1",
          type: "Restaurants",
          places: [
            {
              id: "p1",
              name: "Roscioli Restaurant",
              location: "Via dei Giubbonari, 21/22, Rome",
              notes: "Amazing pasta carbonara and wine selection. Make reservations!",
              photos: [
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
              ]
            }
          ]
        }
      ],
      savedCount: 128,
      isSaved: false
    },
    {
      id: "2",
      title: "Koh Phangan Paradise",
      description: "Best beaches and secret spots",
      coverPhoto: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a",
      location: "Koh Phangan, Thailand",
      authorId: "3", // Different user
      authorUsername: "@asiatraveler",
      createdAt: new Date().toISOString(),
      subTopics: [
        {
          id: "st4",
          type: "Spots",
          places: [
            {
              id: "p5",
              name: "Secret Beach",
              location: "North Coast, Koh Phangan",
              notes: "Hidden gem with crystal clear water. Access through jungle path.",
              photos: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"]
            }
          ]
        }
      ],
      savedCount: 85,
      isSaved: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      {/* Navigation Bar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" onClick={() => {
            setShowNewDashboard(false);
            setSelectedPost(null);
          }}>
            <div className="flex items-center gap-2">
              <Home size={24} className="text-[#fd1d1d]" />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-transparent bg-clip-text">
                Wanderlens
              </h1>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setShowNewDashboard(true)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              New Travel Post
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="pt-20 pb-12 px-4">
        {showNewDashboard ? (
          <DashboardForm onClose={() => setShowNewDashboard(false)} />
        ) : selectedPost ? (
          <PostDetail 
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        ) : (
          <div className="max-w-screen-xl mx-auto">
            <PostList 
              posts={mockDashboards}
              onPostClick={setSelectedPost}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;