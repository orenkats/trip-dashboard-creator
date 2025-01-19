import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';
import { ImageDropzone } from './ImageDropzone';
import { SubTopic } from './types';
import styles from './styles/dashboard.module.css';

const INITIAL_SUBTOPICS: SubTopic[] = [
  { id: '1', type: 'restaurants', places: [] },
  { id: '2', type: 'attractions', places: [] },
  { id: '3', type: 'neighborhoods', places: [] },
  { id: '4', type: 'shopping', places: [] },
];

export const DashboardForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string>();
  const [subTopics, setSubTopics] = useState<SubTopic[]>(INITIAL_SUBTOPICS);

  const handleCoverPhotoUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setCoverPhoto(imageUrl);
    toast.success("Cover photo uploaded successfully!");
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhoto(undefined);
    toast.success("Cover photo removed");
  };

  const handleSaveDraft = () => {
    if (!title) {
      toast.error("Please add a title to your dashboard");
      return;
    }
    toast.success("Draft saved successfully!");
  };

  const handlePublish = () => {
    if (!title) {
      toast.error("Please add a title to your dashboard");
      return;
    }
    if (!description) {
      toast.error("Please add a description to your dashboard");
      return;
    }
    if (subTopics.every(st => st.places.length === 0)) {
      toast.error("Please add at least one place to any category");
      return;
    }
    toast.success("Dashboard published successfully!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create New Dashboard</h1>
        <p className={styles.subtitle}>Share your travel experiences with the world</p>
      </div>

      <div className={styles.formSection}>
        <div>
          <label htmlFor="title" className={styles.label}>Dashboard Title</label>
          <Input
            id="title"
            placeholder="Enter your dashboard title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg"
          />
        </div>

        <div>
          <label htmlFor="description" className={styles.label}>Description</label>
          <Textarea
            id="description"
            placeholder="Describe your travel experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[120px] text-base"
          />
        </div>

        <div>
          <label className={styles.label}>Cover Photo</label>
          <ImageDropzone
            onImageUpload={handleCoverPhotoUpload}
            currentImage={coverPhoto}
            onImageRemove={handleRemoveCoverPhoto}
            className="max-w-xl mx-auto"
          />
        </div>

        <SubTopicsList subTopics={subTopics} setSubTopics={setSubTopics} />

        <div className={styles.buttonContainer}>
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            className="hover:bg-dashboard-100"
          >
            Save Draft
          </Button>
          <Button 
            onClick={handlePublish}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Publish Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};