import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';
import { ImageDropzone } from './ImageDropzone';
import { SubTopic } from './types';
import styles from './styles/dashboard.module.css';
import { MapPin } from 'lucide-react';

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
      type: `Location ${subTopics.length + 1}`,
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
      toast.error("Please add a title to your travel post");
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
    toast.success("Travel post published successfully!");
  };

  return (
    <div className={styles.container}>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Locations</h2>
            <Button
              variant="outline"
              onClick={handleAddSubTopic}
              className={styles.addButton}
            >
              Add Location
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