import { useState, useEffect } from 'react';
import { Post } from '../types/post';
import { toast } from 'sonner';

export const usePostManagement = (initialPosts: Post[]) => {
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

    toast.success(postToSave.isSaved ? "Post removed from bookmarks" : "Post saved to bookmarks");
  };

  return {
    posts,
    savedPosts,
    handleSavePost
  };
};