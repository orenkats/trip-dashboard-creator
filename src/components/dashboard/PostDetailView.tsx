import React from 'react';
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/dashboard";
import { PostContent } from "./PostContent";
import { Comments } from "./Comments";
import { MapPin } from 'lucide-react';

interface PostDetailViewProps {
  currentPost: Post;
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
      <div className="flex gap-6 items-start mb-6">
        <div className="flex-1">
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
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin size={16} />
            <span>{currentPost.location}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{currentPost.authorUsername}</span>
          </div>
        </div>
        <div className="w-1/3 flex-shrink-0">
          <img
            src={currentPost.coverPhoto}
            alt={currentPost.title}
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>
      
      <div className="text-gray-700 mb-4">
        {currentPost.description}
      </div>
      
      <PostContent subTopics={currentPost.subTopics} />
      
      <Comments 
        comments={currentPost.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostDetailView;