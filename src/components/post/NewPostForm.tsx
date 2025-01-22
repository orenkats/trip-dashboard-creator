import React, { useState } from 'react';
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Category, Post } from './types';
import styles from './styles/Post.module.css';

import Header from './Header';
import TitleSection from './TitleSection';
import LocationSection from './LocationSection';
import CaptionSection from './CaptionSection';
import CoverPhotoSection from './CoverPhotoSection';
import CategorySection from './CategorySection';
import ActionButtons from './ActionButtons';

interface PostFormProps {
  onClose?: () => void;
}

const PostForm = ({ onClose }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
  };

  const handlePublish = () => {
    // Create a new post object
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      description,
      coverPhoto,
      location,
      userId: "1",
      userName: "@travelblogger",
      createdAt: new Date().toISOString(),
      categories,
      savedCount: 0,
      isSaved: false,
      comments: [] // Add empty comments array
    };

    console.log('New post created:', newPost);
    toast.success("Travel post published successfully!");
    
    setTitle('');
    setDescription('');
    setLocation('');
    setCoverPhoto(undefined);
    setCategories([]);
    
    onClose?.();
  };

  return (
    <div className={styles.container}>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <Header />

      <div className={styles.formSection}>
        <TitleSection title={title} onTitleChange={setTitle} />
        
        <CaptionSection 
          description={description} 
          onDescriptionChange={setDescription} 
        />

        <CoverPhotoSection 
          coverPhoto={coverPhoto}
          onCoverPhotoChange={setCoverPhoto}
        />

        <CategorySection 
          categories={categories}
          onCategoryChange={setCategories}
        />

        <LocationSection
          location={location}
          onLocationChange={setLocation}
          onLocationSelect={setLocation}
        />

        <ActionButtons
          title={title}
          description={description}
          location={location}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
};

export default PostForm;
