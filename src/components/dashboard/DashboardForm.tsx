import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { SubTopic } from './types';
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
    toast.success("Travel post published successfully!");
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
        
        <LocationSection
          location={location}
          onLocationChange={setLocation}
          onLocationSelect={setLocation}
        />

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