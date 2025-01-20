import { useState, useEffect } from 'react';
import { Dashboard } from '../types';

export const usePostList = (initialPosts: Dashboard[]) => {
  const [posts, setPosts] = useState<Dashboard[]>(initialPosts);

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

    const savedPostIds = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    if (postToSave.isSaved) {
      localStorage.setItem('savedPosts', JSON.stringify(savedPostIds.filter((id: string) => id !== postToSave.id)));
    } else {
      localStorage.setItem('savedPosts', JSON.stringify([...savedPostIds, postToSave.id]));
    }
  };

  return {
    posts,
    setPosts,
    handleSavePost
  };
};