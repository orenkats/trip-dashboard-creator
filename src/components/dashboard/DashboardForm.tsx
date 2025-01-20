import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { SubTopic, Dashboard } from './types';
import styles from './styles/dashboard.module.css';
import Header from './Header';
import TitleSection from './TitleSection';
import LocationSection from './LocationSection';
import CaptionSection from './CaptionSection';
import CoverPhotoSection from './CoverPhotoSection';
import CategorySection from './CategorySection';
import ActionButtons from './ActionButtons';

interface DashboardFormProps {
  onClose?: () => void;
}

const DashboardForm = ({ onClose }: DashboardFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string>();
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
  };

  const handlePublish = () => {
    // Create a new post object
    const newPost: Dashboard = {
      id: Date.now().toString(), // Generate a unique ID
      title,
      description,
      coverPhoto,
      location,
      authorId: "1", // In a real app, this would come from auth
      authorUsername: "@travelblogger", // In a real app, this would come from auth
      createdAt: new Date().toISOString(),
      subTopics,
      savedCount: 0,
      isSaved: false
    };

    // In a real application, this would be an API call to save the post
    // For now, we'll just show a success message and close the form
    console.log('New post created:', newPost);
    toast.success("Travel post published successfully!");
    
    // Reset form
    setTitle('');
    setDescription('');
    setLocation('');
    setCoverPhoto(undefined);
    setSubTopics([]);
    
    // Close the form
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
          subTopics={subTopics}
          onSubTopicsChange={setSubTopics}
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

export default DashboardForm;