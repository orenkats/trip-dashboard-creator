import { useState } from "react";
import { Dashboard } from "@/components/dashboard/types";
import DashboardForm from "@/components/dashboard/DashboardForm";
import { PostList } from "@/components/dashboard/PostList";
import { PostDetail } from "@/components/dashboard/PostDetail";
import { Navigation } from "@/components/dashboard/Navigation";

const Index = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Dashboard | null>(null);
  const [posts, setPosts] = useState<Dashboard[]>([
    {
      id: "1",
      title: "Hidden Gems in Rome",
      description: "My favorite spots in the eternal city",
      coverPhoto: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      location: "Rome, Italy",
      authorId: "2",
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
      isSaved: false,
      comments: [
        {
          id: "c1",
          content: "Love this place! The carbonara is amazing!",
          authorUsername: "@foodlover",
          createdAt: new Date().toISOString(),
        }
      ]
    },
    {
      id: "2",
      title: "Koh Phangan Paradise",
      description: "Best beaches and secret spots",
      coverPhoto: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a",
      location: "Koh Phangan, Thailand",
      authorId: "3",
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
      isSaved: true,
      comments: []
    }
  ]);

  const handleSavePost = (postToSave: Dashboard) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postToSave.id 
          ? {
              ...post,
              isSaved: !post.isSaved,
              savedCount: post.isSaved ? post.savedCount - 1 : post.savedCount + 1
            }
          : post
      )
    );

    // Store saved post IDs in localStorage
    const savedPostIds = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    if (postToSave.isSaved) {
      localStorage.setItem('savedPosts', JSON.stringify(savedPostIds.filter((id: string) => id !== postToSave.id)));
    } else {
      localStorage.setItem('savedPosts', JSON.stringify([...savedPostIds, postToSave.id]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation onNewPost={() => setShowNewDashboard(true)} />
      
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
              posts={posts}
              onPostClick={setSelectedPost}
              onSavePost={handleSavePost}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
