import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';
import { ImageDropzone } from './ImageDropzone';

export type SubTopicType = 'restaurants' | 'attractions' | 'neighborhoods' | 'shopping';

export interface SubTopic {
  id: string;
  type: SubTopicType;
  places: Place[];
}

export interface Place {
  id: string;
  name: string;
  location: string;
  notes: string;
  photos: string[];
}

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
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-b from-white to-dashboard-100 rounded-xl shadow-sm">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-dashboard-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Create New Dashboard
        </h1>
        <p className="text-dashboard-600 text-lg">
          Share your travel experiences with the world
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-dashboard-700 mb-2">
            Dashboard Title
          </label>
          <Input
            id="title"
            placeholder="Enter your dashboard title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-dashboard-700 mb-2">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe your travel experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[120px] text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dashboard-700 mb-2">
            Cover Photo
          </label>
          <ImageDropzone
            onImageUpload={handleCoverPhotoUpload}
            currentImage={coverPhoto}
            onImageRemove={handleRemoveCoverPhoto}
            className="max-w-xl mx-auto"
          />
        </div>

        <SubTopicsList subTopics={subTopics} setSubTopics={setSubTopics} />

        <div className="flex justify-end space-x-4 pt-6">
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