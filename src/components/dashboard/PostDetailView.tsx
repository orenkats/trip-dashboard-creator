import React from 'react';
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/dashboard";
import CaptionSection from "./CaptionSection";
import LocationSection from "./LocationSection";
import CoverPhotoSection from "./CoverPhotoSection";
import { SubTopicsList } from "./SubTopicsList";
import { Comments } from "./Comments";
import { SubTopic } from './types';

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
        onDescriptionChange={() => {}}
      />
      
      <CoverPhotoSection
        coverPhoto={currentPost.coverPhoto || ''}
        description={currentPost.description}
        location={currentPost.location}
        isEditing={false}
        editedDescription={editedDescription}
        editedLocation={editedLocation}
        onEditedDescriptionChange={() => {}}
        onEditedLocationChange={() => {}}
      />
      
      <SubTopicsList 
        subTopics={currentPost.subTopics}
        setSubTopics={handleSubTopicsChange}
      />

      <LocationSection
        location={currentPost.location}
        onLocationChange={() => {}}
        onLocationSelect={() => {}}
      />
      
      <Comments 
        comments={currentPost.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostDetailView;