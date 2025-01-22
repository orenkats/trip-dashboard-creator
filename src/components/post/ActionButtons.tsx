import React from 'react';
import { Button } from "../ui/button";
import { toast } from 'sonner';
import { validateTravelPost } from '../../utils/location';
import { ActionButtonsProps } from '../../types/post';
import styles from './styles/dashboard.module.css';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  title,
  description,
  location,
  onSaveDraft,
  onPublish
}) => {
  const handleSaveDraft = () => {
    if (!title || !location) {
      toast.error("Please add a title and location to your travel post");
      return;
    }
    onSaveDraft();
  };

  const handlePublish = () => {
    if (validateTravelPost(title, description, location)) {
      onPublish();
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <Button 
        variant="outline" 
        onClick={handleSaveDraft}
        className="hover:bg-gray-50"
      >
        Save Draft
      </Button>
      <Button 
        onClick={handlePublish}
        className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-90 text-white"
      >
        Share Post
      </Button>
    </div>
  );
};

export default ActionButtons;