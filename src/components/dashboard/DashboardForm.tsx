import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';

export interface SubTopic {
  id: string;
  title: string;
  places: Place[];
}

export interface Place {
  id: string;
  name: string;
  location: string;
  notes: string;
}

export const DashboardForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

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
    if (subTopics.length === 0) {
      toast.error("Please add at least one sub-topic");
      return;
    }
    toast.success("Dashboard published successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-dashboard-800">Create New Dashboard</h1>
        <p className="text-dashboard-600">Share your travel experiences with the world</p>
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
            className="w-full"
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
            className="w-full min-h-[120px]"
          />
        </div>

        <SubTopicsList subTopics={subTopics} setSubTopics={setSubTopics} />

        <div className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            Publish Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};