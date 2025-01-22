import React from 'react';
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/post";
import CaptionSection from "./CaptionSection";
import LocationSection from "./LocationSection";
import CoverPhotoSection from "./CoverPhotoSection";
import { CategoryList } from './CategoryList';
import { Comments } from "./Comments";
import { Category } from './types';

interface PostDetailEditProps {
  currentPost: Post;
  editedTitle: string;
  editedDescription: string;
  editedLocation: string;
  setEditedTitle: (title: string) => void;
  setEditedDescription: (description: string) => void;
  setEditedLocation: (location: string) => void;
  handleSaveEdit: () => void;
  setIsEditing: (isEditing: boolean) => void;
  handleBookmark: () => void;
  onClose: () => void;
}

const PostDetailEdit: React.FC<PostDetailEditProps> = ({
  currentPost,
  editedTitle,
  editedDescription,
  editedLocation,
  setEditedTitle,
  setEditedDescription,
  setEditedLocation,
  handleSaveEdit,
  setIsEditing,
  handleBookmark,
  onClose,
}) => {
  const handleCategoriesChange = (newCategories: Category[]) => {
    console.log('Updating Categories:', newCategories);
  };

  const handleAddComment = (content: string) => {
    console.log('Adding comment:', content);
  };

  const handleCoverPhotoChange = (photo?: string) => {
    console.log('Cover photo changed:', photo);
  };

  return (
    <div className="space-y-6">
      <PostHeader
        title={currentPost.title}
        isEditing={true}
        editedTitle={editedTitle}
        isSaved={currentPost.isSaved || false}
        userId={currentPost.userId}
        username={currentPost.userName}
        onEditedTitleChange={setEditedTitle}
        onSaveEdit={handleSaveEdit}
        onToggleEdit={() => setIsEditing(false)}
        onBookmark={handleBookmark}
        onClose={onClose}
        isCurrentUserPost={true}
      />
      
      <CaptionSection
        description={editedDescription}
        onDescriptionChange={setEditedDescription}
      />
      
      <CoverPhotoSection
        coverPhoto={currentPost.coverPhoto || ''}
        onCoverPhotoChange={handleCoverPhotoChange}
      />
      
      <CategoryList 
        categories={currentPost.categories}
        setCategories={handleCategoriesChange}
      />

      <LocationSection
        location={editedLocation}
        onLocationChange={setEditedLocation}
        onLocationSelect={setEditedLocation}
      />
      
      <Comments 
        comments={currentPost.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostDetailEdit;