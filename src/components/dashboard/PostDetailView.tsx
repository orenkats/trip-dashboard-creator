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
    <div className="space-y-6 overflow-hidden">
      <div className="relative h-48 sm:h-64 md:h-72 -mx-6 -mt-6">
        <img
          src={currentPost.coverPhoto}
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-2">
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
        
        <div className="text-gray-700 mt-6">
          {currentPost.description}
        </div>
        
        <PostContent subTopics={currentPost.subTopics} />
        
        <Comments 
          comments={currentPost.comments}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
};

export default PostDetailView;