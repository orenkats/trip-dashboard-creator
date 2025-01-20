import React from 'react';
import { Button } from "../../components/ui/button";
import { SubTopicsList } from './SubTopicsList';
import { toast } from 'sonner';
import { SubTopic, SubTopicType } from './types';
import styles from './styles/dashboard.module.css';

interface CategorySectionProps {
  subTopics: SubTopic[];
  onSubTopicsChange: (subTopics: SubTopic[]) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ subTopics, onSubTopicsChange }) => {
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
    onSubTopicsChange([...subTopics, newSubTopic]);
    toast.success(`${type} section added`);
  };

  return (
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
        setSubTopics={onSubTopicsChange}
      />
    </div>
  );
};

export default CategorySection;