import React from 'react';
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/dashboard";
import { CaptionSection } from "./CaptionSection";
import { LocationSection } from "./LocationSection";
import { CoverPhotoSection } from "./CoverPhotoSection";
import { SubTopicsList } from "./SubTopicsList";
import { Comments } from "./Comments";

interface PostDetailViewProps {
  currentPost: Post;
  editedTitle: string;
  editedDescription: string;
  editedLocation: string;
  setEditedTitle: (title: string) => void;
  handleSaveEdit: () => void;
  setIsEditing: (isEditing: boolean) => void;
  handleBookmark: () => void;
  onClose: () => void;
}

const PostDetailView: React.FC<PostDetailViewProps> = ({
  currentPost,
  editedTitle,
  editedDescription,
  editedLocation,
  setEditedTitle,
  handleSaveEdit,
  setIsEditing,
  handleBookmark,
  onClose,
}) => {
  return (
    <div className="space-y-6">
      <PostHeader
        title={currentPost.title}
        isEditing={false}
        editedTitle={editedTitle}
        isSaved={currentPost.isSaved || false}
        authorId={currentPost.authorId}
        authorUsername={currentPost.authorUsername}
        onEditedTitleChange={setEditedTitle}
        onSaveEdit={handleSaveEdit}
        onToggleEdit={() => setIsEditing(true)}
        onBookmark={handleBookmark}
        onClose={onClose}
      />
      
      <CaptionSection
        description={currentPost.description}
        isEditing={false}
        editedDescription={editedDescription}
      />
      
      <LocationSection
        location={currentPost.location}
        isEditing={false}
        editedLocation={editedLocation}
      />
      
      <CoverPhotoSection coverPhoto={currentPost.coverPhoto} />
      
      <SubTopicsList subTopics={currentPost.subTopics} />
      
      <Comments comments={currentPost.comments} />
    </div>
  );
};

export default PostDetailView;