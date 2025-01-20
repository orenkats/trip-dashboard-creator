import { useState, useEffect } from "react";
import { Navigation } from "../components/dashboard/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import NewPostForm from "../components/dashboard/NewPostForm";
import { PostDetail } from "../components/dashboard/PostDetail";
import { PostList } from "../components/dashboard/PostList";
import { usePostList } from "../features/posts/hooks/usePostList";

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
        },
        {
          id: "st2",
          type: "Spots",
          places: [
            {
              id: "p2",
              name: "Eiffel Tower",
              location: "Champ de Mars",
              notes: "Iconic landmark",
              photos: []
            }
          ]
        }
      ],
      savedCount: 45,
      isSaved: false,
      comments: []
    },
    {
      id: "user-post-2",
      title: "Venice Adventures",
      description: "Getting lost in Venice's narrow streets",
      coverPhoto: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      location: "Venice, Italy",
      authorId: "1",
      authorUsername: "@currentuser",
      createdAt: new Date().toISOString(),
      subTopics: [
        {
          id: "st3",
          type: "Culture",
          places: [
            {
              id: "p3",
              name: "St. Mark's Basilica",
              location: "Piazza San Marco",
              notes: "Beautiful Byzantine architecture",
              photos: []
            }
          ]
        }
      ],
      savedCount: 32,
      isSaved: false,
      comments: []
    }
];

const Profile = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const { posts: userPosts, handleSavePost } = usePostList(initialUserPosts);

  useEffect(() => {
    const saved = userPosts.filter(post => post.isSaved);
    setSavedPosts(saved);
  }, [userPosts]);

  const handleNavigationClick = () => {
    if (selectedPost) {
      setSelectedPost(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation 
        onNewPost={() => setShowNewDashboard(true)} 
        onProfileClick={handleNavigationClick}
      />
      
      <main className="pt-20 pb-12 px-4">
        {showNewDashboard ? (
          <NewPostForm onClose={() => setShowNewDashboard(false)} />
        ) : selectedPost ? (
          <PostDetail 
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        ) : (
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
                <TabsTrigger value="posts" className="flex-1">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  Saved
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-6">
                <PostList 
                  posts={userPosts} 
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
        )}
      </main>
    </div>
  );
};

export default Profile;
