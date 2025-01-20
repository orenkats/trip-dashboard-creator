import React from 'react';
import { Dashboard } from './types';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Comments } from './Comments';
import { PostHeader } from './PostHeader';
import { PostCoverSection } from './PostCoverSection';
import { usePostEdit } from './hooks/usePostEdit';
import { PostContent } from './PostContent';
import CategorySection from './CategorySection';
import CaptionSection from './CaptionSection';
import CoverPhotoSection from './CoverPhotoSection';
import LocationSection from './LocationSection';
import TitleSection from './TitleSection';

interface PostDetailProps {
  post: Dashboard;
  onClose: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  const {
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
  } = usePostEdit(post);

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
        <PostHeader
          title={currentPost.title}
          isEditing={isEditing}
          editedTitle={editedTitle}
          isSaved={currentPost.isSaved || false}
          authorId={currentPost.authorId}
          onEditedTitleChange={setEditedTitle}
          onSaveEdit={handleSaveEdit}
          onToggleEdit={() => setIsEditing(false)}
          onBookmark={handleBookmark}
          onClose={onClose}
        />

        <TitleSection 
          title={editedTitle}
          onTitleChange={setEditedTitle}
        />

        <CaptionSection 
          description={editedDescription}
          onDescriptionChange={setEditedDescription}
        />

        <CoverPhotoSection 
          coverPhoto={currentPost.coverPhoto}
          onCoverPhotoChange={() => {}}
        />

        <CategorySection 
          subTopics={editedSubTopics}
          onSubTopicsChange={setEditedSubTopics}
        />

        <LocationSection
          location={editedLocation}
          onLocationChange={setEditedLocation}
          onLocationSelect={setEditedLocation}
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <PostHeader
        title={currentPost.title}
        isEditing={isEditing}
        editedTitle={editedTitle}
        isSaved={currentPost.isSaved || false}
        authorId={currentPost.authorId}
        onEditedTitleChange={setEditedTitle}
        onSaveEdit={handleSaveEdit}
        onToggleEdit={() => setIsEditing(true)}
        onBookmark={handleBookmark}
        onClose={onClose}
      />
      
      <PostCoverSection
        coverPhoto={currentPost.coverPhoto || ''}
        description={currentPost.description}
        location={currentPost.location}
        isEditing={isEditing}
        editedDescription={editedDescription}
        editedLocation={editedLocation}
        onEditedDescriptionChange={setEditedDescription}
        onEditedLocationChange={setEditedLocation}
      />

      <ScrollArea className="h-[calc(100vh-400px)]">
        <PostContent subTopics={currentPost.subTopics} />
        
        <Card className="mt-6">
          <CardContent className="pt-6">
            <Comments 
              comments={currentPost.comments || []} 
              onAddComment={handleAddComment}
            />
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};