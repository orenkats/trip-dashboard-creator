import React, { useState } from "react";
import NewPostForm from "../components/dashboard/NewPostForm";
import { PostList } from "../components/dashboard/PostList";
import { Navigation } from "../components/dashboard/Navigation";
import { usePostList } from "../features/posts/hooks/usePostList";
import { Post, SubTopicType } from "../components/dashboard/types";
import PostDetailView from "../components/dashboard/PostDetailView";
import PostDetailEdit from "../components/dashboard/PostDetailEdit";

const initialPosts: Post[] = [
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
        type: "Restaurants" as SubTopicType,
        places: [
          {
            id: "p1",
            name: "Roscioli Restaurant",
            location: "Via dei Giubbonari, 21/22, Rome",
            notes: "Amazing pasta carbonara and wine selection. Make reservations!",
            photos: [
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
              "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
            ]
          },
          {
            id: "p3",
            name: "Salumeria Roscioli",
            location: "Via dei Giubbonari, 21/22, Rome",
            notes: "Hidden in a deli, this restaurant serves some of the best cacio e pepe in Rome. The cheese and cured meat selection is outstanding!",
            photos: [
              "https://images.unsplash.com/photo-1498579150354-977475b7ea0b",
              "https://images.unsplash.com/photo-1528735602780-2552fd46c7af"
            ]
          }
        ]
      },
      {
        id: "st2",
        type: "Spots" as SubTopicType,
        places: [
          {
            id: "p2",
            name: "Trastevere",
            location: "Trastevere, Rome",
            notes: "Charming neighborhood with cobblestone streets and authentic Roman atmosphere",
            photos: [
              "https://images.unsplash.com/photo-1529260830199-42c24126f198"
            ]
          }
        ]
      },
      {
        id: "st3",
        type: "Culture" as SubTopicType,
        places: [
          {
            id: "p4",
            name: "Galleria Borghese",
            location: "Piazzale Scipione Borghese, 5",
            notes: "Stunning art collection featuring Bernini sculptures and Caravaggio paintings. Book tickets in advance!",
            photos: [
              "https://images.unsplash.com/photo-1590645780426-c4a77bcf9c33"
            ]
          }
        ]
      },
      {
        id: "st4",
        type: "Hotels" as SubTopicType,
        places: [
          {
            id: "p5",
            name: "Hotel Locarno",
            location: "Via della Penna, 22",
            notes: "Historic art deco hotel with a beautiful bar. Perfect location near Villa Borghese.",
            photos: [
              "https://images.unsplash.com/photo-1566073771259-6a8506099945"
            ]
          }
        ]
      },
      {
        id: "st5",
        type: "Hidden Gems" as SubTopicType,
        places: [
          {
            id: "p6",
            name: "Quartiere Coppedè",
            location: "Quartiere Coppedè",
            notes: "Art Nouveau architectural district off the tourist track. Look for the amazing fountain of the frogs!",
            photos: [
              "https://images.unsplash.com/photo-1548142813-c348350df52b"
            ]
          }
        ]
      },
      {
        id: "st6",
        type: "Links" as SubTopicType,
        places: [
          {
            id: "p7",
            name: "Rome Museum Pass",
            location: "Online Booking",
            notes: "Official website for booking museum passes and skip-the-line tickets",
            photos: []
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
        createdAt: new Date().toISOString()
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
        type: "Spots" as SubTopicType,
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
];

const Index = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { posts, handleSavePost } = usePostList(initialPosts);

  const handleNewPost = () => {
    setShowNewDashboard(true);
    setSelectedPost(null);
  };

  const handleCloseNewPost = () => {
    setShowNewDashboard(false);
  };

  const handleNavigateHome = () => {
    setShowNewDashboard(false);
    setSelectedPost(null);
  };

  const renderContent = () => {
    if (showNewDashboard) {
      return <NewPostForm onClose={handleCloseNewPost} />;
    }

    if (selectedPost) {
      const isCurrentUserPost = selectedPost.authorId === "1";
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
      <PostList 
        posts={posts}
        onPostClick={setSelectedPost}
        onSavePost={handleSavePost}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation 
        onNewPost={handleNewPost} 
        onHomeClick={handleNavigateHome}
      />
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;