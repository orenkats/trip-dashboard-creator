import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';
import { ImageDropzone } from './ImageDropzone';
import { SubTopic } from './types';
import styles from './styles/dashboard.module.css';
import { BookOpen } from 'lucide-react';

const DashboardForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      toast.error("Please add a title to your travel story");
      return;
    }
    toast.success("Draft saved successfully!");
  };

  const handlePublish = () => {
    if (!title) {
      toast.error("Please add a title to your travel story");
      return;
    }
    if (!description) {
      toast.error("Please add a description to your travel story");
      return;
    }
    toast.success("Travel story published successfully!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-dashboard-700 opacity-80" />
        <h1 className={styles.title}>Travel Stories</h1>
        <p className={styles.subtitle}>Share your journey with the world</p>
      </div>

      <div className={styles.formSection}>
        <div className="mb-8">
          <label htmlFor="title" className={styles.label}>Title Your Journey</label>
          <Input
            id="title"
            placeholder="What would you call this adventure?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-serif bg-white/70"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="description" className={styles.label}>Tell Your Story</label>
          <Textarea
            id="description"
            placeholder="Paint a picture with your words..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[150px] text-base font-serif bg-white/70"
          />
        </div>

        <div className="mb-8">
          <label className={styles.label}>Cover Image</label>
          <ImageDropzone
            onImageUpload={handleCoverPhotoUpload}
            currentImage={coverPhoto}
            onImageRemove={handleRemoveCoverPhoto}
            className="max-w-xl mx-auto"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-semibold text-dashboard-800">Places Visited</h2>
            <Button
              variant="outline"
              onClick={handleAddSubTopic}
              className={styles.addButton}
            >
              Add New Place
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
            className="hover:bg-dashboard-100 font-serif"
          >
            Save Draft
          </Button>
          <Button 
            onClick={handlePublish}
            className="bg-gradient-to-r from-[#9b87f5] to-[#8E9196] hover:from-[#9b87f5]/90 hover:to-[#8E9196]/90 text-white font-serif"
          >
            Publish Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;