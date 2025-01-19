import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';
import { ImageDropzone } from './ImageDropzone';
import { SubTopic } from './types';
import styles from './styles/dashboard.module.css';

const DashboardForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string>();
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  const handleCoverPhotoUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setCoverPhoto(imageUrl);
    toast.success("Cover photo uploaded successfully!");
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhoto(undefined);
    toast.success("Cover photo removed");
  };

  const handleAddSubTopic = () => {
    const newSubTopic: SubTopic = {
      id: Date.now().toString(),
      type: `New Category ${subTopics.length + 1}`,
      places: []
    };
    setSubTopics([...subTopics, newSubTopic]);
  };

  const handleUpdateSubTopicName = (id: string, newName: string) => {
    setSubTopics(subTopics.map(st => 
      st.id === id ? { ...st, type: newName } : st
    ));
  };

  const handleSaveDraft = () => {
    if (!title) {
      toast.error("Please add a title to your diary");
      return;
    }
    toast.success("Draft saved successfully!");
  };

  const handlePublish = () => {
    if (!title) {
      toast.error("Please add a title to your diary");
      return;
    }
    if (!description) {
      toast.error("Please add a description to your diary");
      return;
    }
    toast.success("Diary entry published successfully!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Travel Diary</h1>
        <p className={styles.subtitle}>Document your journey, one story at a time</p>
      </div>

      <div className={styles.formSection}>
        <div className="mb-8">
          <label htmlFor="title" className={styles.label}>Title of Your Journey</label>
          <Input
            id="title"
            placeholder="Give your journey a memorable title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-serif"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="description" className={styles.label}>Your Story</label>
          <Textarea
            id="description"
            placeholder="Share the story of your adventure..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[150px] text-base font-serif"
          />
        </div>

        <div className="mb-8">
          <label className={styles.label}>Cover Memory</label>
          <ImageDropzone
            onImageUpload={handleCoverPhotoUpload}
            currentImage={coverPhoto}
            onImageRemove={handleRemoveCoverPhoto}
            className="max-w-xl mx-auto"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-dashboard-800">Categories</h2>
            <Button
              variant="outline"
              onClick={handleAddSubTopic}
              className={styles.addButton}
            >
              Add New Category
            </Button>
          </div>
          <SubTopicsList 
            subTopics={subTopics} 
            setSubTopics={setSubTopics}
            onUpdateSubTopicName={handleUpdateSubTopicName}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            className="hover:bg-dashboard-100"
          >
            Save as Draft
          </Button>
          <Button 
            onClick={handlePublish}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Publish Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;