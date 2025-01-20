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
      <div className="relative aspect-[4/3] mb-6 rounded-xl overflow-hidden">
        <img
          src={currentPost.coverPhoto}
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-semibold text-white mb-2">{currentPost.title}</h1>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin size={16} />
            <span>{currentPost.location}</span>
          </div>
          <button
            onClick={() => {}}
            className="text-sm text-white/80 hover:text-white transition-colors mt-2"
          >
            {currentPost.authorUsername}
          </button>
        </div>
      </div>

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
      
      <PostContent subTopics={currentPost.subTopics} />
      
      <Comments 
        comments={currentPost.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostDetailView;