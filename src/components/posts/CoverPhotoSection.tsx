import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface CoverPhotoSectionProps {
  coverPhoto?: string;
  onCoverPhotoChange: (value: string) => void;
}

const CoverPhotoSection: React.FC<CoverPhotoSectionProps> = ({ coverPhoto, onCoverPhotoChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) onCoverPhotoChange(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <TextField
        label="Cover Photo URL"
        variant="outlined"
        fullWidth
        value={coverPhoto || ''}
        onChange={(e) => onCoverPhotoChange(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" component="label">
        Upload Cover Photo
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
};

export default CoverPhotoSection;
