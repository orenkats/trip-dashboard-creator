import React from 'react';
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/dashboard";
import { CaptionSection } from "./CaptionSection";
import { LocationSection } from "./LocationSection";
import { CoverPhotoSection } from "./CoverPhotoSection";
import { SubTopicsList } from "./SubTopicsList";
import { Comments } from "./Comments";

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
  return (
    <div className="space-y-6">
      <PostHeader
        title={currentPost.title}
        isEditing={true}
        editedTitle={editedTitle}
        isSaved={currentPost.isSaved || false}
        authorId={currentPost.authorId}
        authorUsername={currentPost.authorUsername}
        onEditedTitleChange={setEditedTitle}
        onSaveEdit={handleSaveEdit}
        onToggleEdit={() => setIsEditing(false)}
        onBookmark={handleBookmark}
        onClose={onClose}
      />
      
      <CaptionSection
        description={currentPost.description}
        isEditing={true}
        editedDescription={editedDescription}
        onEditedDescriptionChange={setEditedDescription}
      />
      
      <LocationSection
        location={currentPost.location}
        isEditing={true}
        editedLocation={editedLocation}
        onEditedLocationChange={setEditedLocation}
      />
      
      <CoverPhotoSection coverPhoto={currentPost.coverPhoto} />
      
      <SubTopicsList subTopics={currentPost.subTopics} />
      
      <Comments comments={currentPost.comments} />
    </div>
  );
};

export default PostDetailEdit;