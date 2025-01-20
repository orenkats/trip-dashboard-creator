import React, { useState } from 'react';
import { Post } from "../../types/dashboard";
import PostDetailEdit from './PostDetailEdit';
import PostDetailView from './PostDetailView';

interface PostDetailProps {
  post: Post;
  onClose: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [editedLocation, setEditedLocation] = useState(post.location);

  const handleSaveEdit = () => {
    setCurrentPost(prev => ({
      ...prev,
      title: editedTitle,
      description: editedDescription,
      location: editedLocation
    }));
    setIsEditing(false);
  };

  const handleBookmark = () => {
    setCurrentPost(prev => ({
      ...prev,
      isSaved: !prev.isSaved,
      savedCount: prev.isSaved ? (prev.savedCount - 1) : (prev.savedCount + 1)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        {isEditing ? (
          <PostDetailEdit
            currentPost={currentPost}
            editedTitle={editedTitle}
            editedDescription={editedDescription}
            editedLocation={editedLocation}
            setEditedTitle={setEditedTitle}
            setEditedDescription={setEditedDescription}
            setEditedLocation={setEditedLocation}
            handleSaveEdit={handleSaveEdit}
            setIsEditing={setIsEditing}
            handleBookmark={handleBookmark}
            onClose={onClose}
          />
        ) : (
          <PostDetailView
            currentPost={currentPost}
            editedTitle={editedTitle}
            editedDescription={editedDescription}
            editedLocation={editedLocation}
            setEditedTitle={setEditedTitle}
            handleSaveEdit={handleSaveEdit}
            setIsEditing={setIsEditing}
            handleBookmark={handleBookmark}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};