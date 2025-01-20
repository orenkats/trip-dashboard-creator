import React from 'react';
import { Button } from '../ui/button';
import { BookmarkIcon, X, Check } from 'lucide-react';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';

interface PostHeaderProps {
  title: string;
  isEditing: boolean;
  editedTitle: string;
  isSaved: boolean;
  authorId: string;
  authorUsername: string;
  onEditedTitleChange: (value: string) => void;
  onSaveEdit: () => void;
  onToggleEdit: () => void;
  onBookmark: () => void;
  onClose: () => void;
  isCurrentUserPost: boolean;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  isEditing,
  editedTitle,
  isSaved,
  authorId,
  authorUsername,
  onEditedTitleChange,
  onSaveEdit,
  onToggleEdit,
  onBookmark,
  onClose,
  isCurrentUserPost,
}) => {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    navigate(`/profile/${authorId}`);
  };

  return (
    <div className="relative mb-6">
      <div className="absolute right-0 top-0 flex gap-2">
        {isCurrentUserPost && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? onSaveEdit() : onToggleEdit()}
          >
            {isEditing ? <Check size={20} /> : null}
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBookmark}
          className={isSaved ? "text-[#fd1d1d]" : ""}
        >
          <BookmarkIcon size={20} />
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>
      
      <div className="pr-24">
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => onEditedTitleChange(e.target.value)}
            className="text-2xl font-semibold w-full mr-4"
          />
        ) : (
          <>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <button
              onClick={handleUsernameClick}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors w-fit"
            >
              {authorUsername}
            </button>
          </>
        )}
      </div>
    </div>
  );
};