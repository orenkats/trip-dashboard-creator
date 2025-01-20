import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Dashboard, SubTopic } from '../types';

export const usePostEdit = (post: Dashboard) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [editedLocation, setEditedLocation] = useState(post.location);
  const [editedSubTopics, setEditedSubTopics] = useState<SubTopic[]>(post.subTopics);
  const { toast } = useToast();

  const handleSaveEdit = () => {
    setCurrentPost(prev => ({
      ...prev,
      title: editedTitle,
      description: editedDescription,
      location: editedLocation,
      subTopics: editedSubTopics
    }));
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your post has been updated successfully",
    });
  };

  const handleBookmark = () => {
    setCurrentPost(prev => ({
      ...prev,
      isSaved: !prev.isSaved,
      savedCount: prev.isSaved ? prev.savedCount - 1 : prev.savedCount + 1
    }));

    toast({
      title: currentPost.isSaved ? "Removed from bookmarks" : "Added to bookmarks",
      description: currentPost.isSaved ? "Post removed from your bookmarks" : "Post saved to your bookmarks",
    });
  };

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Math.random().toString(),
      content,
      authorUsername: "current_user",
      createdAt: new Date().toISOString(),
    };

    setCurrentPost(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  return {
    currentPost,
    isEditing,
    editedTitle,
    editedDescription,
    editedLocation,
    editedSubTopics,
    setEditedTitle,
    setEditedDescription,
    setEditedLocation,
    setEditedSubTopics,
    setIsEditing,
    handleSaveEdit,
    handleBookmark,
    handleAddComment,
  };
};