import React from 'react';
import { Button } from '../ui/button';
import { BookmarkIcon, Edit2, Check, X } from 'lucide-react';
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
}) => {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    navigate(`/profile/${authorId}`);
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
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
      <div className="flex gap-2">
        {authorId === "1" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? onSaveEdit() : onToggleEdit()}
          >
            {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
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
    </div>
  );
};