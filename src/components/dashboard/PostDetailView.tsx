import React from 'react';
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/dashboard";
import { PostContent } from "./PostContent";
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
  isCurrentUserPost: boolean;
}

const PostDetailView: React.FC<PostDetailViewProps> = ({
  currentPost,
  handleSaveEdit,
  setIsEditing,
  handleBookmark,
  onClose,
  isCurrentUserPost,
}) => {
  const handleAddComment = (content: string) => {
    console.log('Adding comment:', content);
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
      
      {currentPost.coverPhoto && (
        <div className="relative aspect-[4/3] mb-6">
          <img
            src={currentPost.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}
      
      <PostContent subTopics={currentPost.subTopics} />

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