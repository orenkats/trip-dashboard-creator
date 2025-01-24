import React from 'react';
import TextField from '@mui/material/TextField';

interface TitleSectionProps {
  title: string;
  onTitleChange: (value: string) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title, onTitleChange }) => {
  return (
    <TextField
      label="Title"
      variant="outlined"
      fullWidth
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      margin="normal"
    />
  );
};

export default TitleSection;
