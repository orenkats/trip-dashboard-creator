import React from 'react';
import { Input } from "@/components/ui/input";
import styles from './styles/dashboard.module.css';

interface TitleSectionProps {
  title: string;
  onTitleChange: (value: string) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title, onTitleChange }) => {
  return (
    <div className="mb-8">
      <label htmlFor="title" className={styles.label}>Title</label>
      <Input
        id="title"
        placeholder="What's this post about?"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full text-lg bg-gray-50/50 border-gray-200"
      />
    </div>
  );
};

export default TitleSection;