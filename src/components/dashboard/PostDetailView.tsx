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
  isCurrentUserPost: boolean;
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
  isCurrentUserPost,
}) => {
  const handleSubTopicsChange = (newSubTopics: SubTopic[]) => {
    console.log('Updating subtopics:', newSubTopics);
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
        isEditing={false}
        editedTitle={currentPost.title}
        isSaved={currentPost.isSaved || false}
        authorId={currentPost.authorId}
        authorUsername={currentPost.authorUsername}
        onEditedTitleChange={() => {}}
        onSaveEdit={handleSaveEdit}
        onToggleEdit={() => setIsEditing(true)}
        onBookmark={handleBookmark}
        onClose={onClose}
        isCurrentUserPost={isCurrentUserPost}
      />
      
      <div className="text-gray-700 mb-4">
        {currentPost.description}
      </div>
      
      <CoverPhotoSection
        coverPhoto={currentPost.coverPhoto || ''}
        onCoverPhotoChange={handleCoverPhotoChange}
      />
      
      <SubTopicsList 
        subTopics={currentPost.subTopics}
        setSubTopics={handleSubTopicsChange}
      />

      <div className="text-gray-700 mb-4">
        Location: {currentPost.location}
      </div>
      
      <Comments 
        comments={currentPost.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostDetailView;