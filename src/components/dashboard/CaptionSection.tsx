import React from 'react';
import { Textarea } from "../ui/textarea";
import styles from './styles/dashboard.module.css';

interface CaptionSectionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

const CaptionSection: React.FC<CaptionSectionProps> = ({ description, onDescriptionChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="description" className={styles.label}>Caption</label>
      <Textarea
        id="description"
        placeholder="Share the story behind these places..."
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="w-full min-h-[80px] bg-gray-50/50 border-gray-200"
      />
    </div>
  );
};

export default CaptionSection;