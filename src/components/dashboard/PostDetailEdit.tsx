import React from 'react';
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/dashboard";
import CaptionSection from "./CaptionSection";
import LocationSection from "./LocationSection";
import CoverPhotoSection from "./CoverPhotoSection";
import { SubTopicsList } from "./SubTopicsList";
import { Comments } from "./Comments";
import { SubTopic } from './types';

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
  const handleSubTopicsChange = (newSubTopics: SubTopic[]) => {
    console.log('Updating subtopics:', newSubTopics);
  };

  const handleAddComment = (content: string) => {
    console.log('Adding comment:', content);
  };

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
        description={editedDescription}
        onDescriptionChange={setEditedDescription}
      />
      
      <CoverPhotoSection
        coverPhoto={currentPost.coverPhoto || ''}
        isEditing={true}
        editedDescription={editedDescription}
        editedLocation={editedLocation}
        onEditedDescriptionChange={setEditedDescription}
        onEditedLocationChange={setEditedLocation}
      />
      
      <SubTopicsList 
        subTopics={currentPost.subTopics} 
        setSubTopics={handleSubTopicsChange}
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