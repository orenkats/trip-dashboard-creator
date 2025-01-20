import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';
import { ImageDropzone } from './ImageDropzone';
import { SubTopic, SubTopicType } from './types';
import styles from './styles/dashboard.module.css';
import { MapPin, X } from 'lucide-react';
import LocationSection from './LocationSection';

interface DashboardFormProps {
  onClose?: () => void;
}

const DashboardForm = ({ onClose }: DashboardFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string>();
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  const handleCoverPhotoUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setCoverPhoto(imageUrl);
    toast.success("Photo uploaded successfully!");
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhoto(undefined);
    toast.success("Photo removed");
  };

  const handleAddSubTopic = (type: SubTopicType) => {
    if (subTopics.some(st => st.type === type)) {
      toast.error(`${type} section already exists`);
      return;
    }

    const newSubTopic: SubTopic = {
      id: Date.now().toString(),
      type: type,
      places: []
    };
    setSubTopics([...subTopics, newSubTopic]);
    toast.success(`${type} section added`);
  };

  const handleSaveDraft = () => {
    if (!title) {
      toast.error("Please add a title to your travel post");
      return;
    }
    if (!location) {
      toast.error("Please add a location to your travel post");
      return;
    }
    toast.success("Draft saved successfully!");
  };

  const handlePublish = () => {
    if (!title) {
      toast.error("Please add a title to your travel post");
      return;
    }
    if (!description) {
      toast.error("Please add a description to your travel post");
      return;
    }
    if (!location) {
      toast.error("Please add a location to your travel post");
      return;
    }
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
      
      <div className={styles.header}>
        <MapPin className="w-8 h-8 mx-auto text-[#fd1d1d]" />
        <h1 className={styles.title}>New Travel Post</h1>
        <p className={styles.subtitle}>Share your favorite spots with your followers</p>
      </div>

      <div className={styles.formSection}>
        <div className="mb-8">
          <label htmlFor="title" className={styles.label}>Title</label>
          <Input
            id="title"
            placeholder="What's this post about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg bg-gray-50/50 border-gray-200"
          />
        </div>

        <LocationSection
          location={location}
          onLocationChange={setLocation}
          onLocationSelect={setLocation}
        />

        <div className="mb-8">
          <label htmlFor="description" className={styles.label}>Caption</label>
          <Textarea
            id="description"
            placeholder="Share the story behind these places..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[120px] bg-gray-50/50 border-gray-200"
          />
        </div>

        <div className="mb-8">
          <label className={styles.label}>Cover Photo</label>
          <ImageDropzone
            onImageUpload={handleCoverPhotoUpload}
            currentImage={coverPhoto}
            onImageRemove={handleRemoveCoverPhoto}
            className="w-full aspect-[4/3]"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
          <div className="flex gap-2">
            {(['Restaurants', 'Spots', 'Culture'] as SubTopicType[]).map((type) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => handleAddSubTopic(type)}
                className={styles.addButton}
                disabled={subTopics.some(st => st.type === type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <SubTopicsList 
            subTopics={subTopics} 
            setSubTopics={setSubTopics}
          />
        </div>

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
            className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white"
          >
            Share Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;