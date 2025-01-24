import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface PostActionsProps {
  title: string;
  description: string;
  onSaveDraft: () => void;
  onPublish: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  title,
  description,
  onSaveDraft,
  onPublish,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button
        variant="outlined"
        onClick={onSaveDraft}
        disabled={!title || !description}
      >
        Save Draft
      </Button>
      <Button
        variant="contained"
        onClick={onPublish}
        disabled={!title || !description}
      >
        Publish
      </Button>
    </Box>
  );
};

export default PostActions;
