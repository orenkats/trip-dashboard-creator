import { useState, useEffect } from 'react';
import { Post } from '../types/dashboard';
import { toast } from 'sonner';

export const useProfileData = (initialPosts: Post[]) => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const saved = posts.filter(post => post.isSaved);
    setSavedPosts(saved);
  }, [posts]);

  const handleSavePost = (postToSave: Post) => {
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

    toast(postToSave.isSaved ? "Post removed from bookmarks" : "Post saved to bookmarks");
  };

  return {
    showNewDashboard,
    setShowNewDashboard,
    selectedPost,
    setSelectedPost,
    posts,
    savedPosts,
    handleSavePost,
  };
};