import React from 'react';
import TextField from '@mui/material/TextField';

interface CaptionSectionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

const CaptionSection: React.FC<CaptionSectionProps> = ({ description, onDescriptionChange }) => {
  return (
    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      multiline
      rows={4}
      value={description}
      onChange={(e) => onDescriptionChange(e.target.value)}
      margin="normal"
    />
  );
};

export default CaptionSection;
