import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Close as CloseIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Category, Post } from '../../services/types';

import TitleSection from './TitleSection';
import CaptionSection from './CaptionSection';
import CategorySection from './CategorySection';
import CoverPhotoSection from './CoverPhotoSection';
import PostActions from './PostActions';

interface PostFormProps {
  onClose?: () => void;
}

const CreateNewPost = ({ onClose }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  const handlePublish = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      description,
      coverPhoto,
      location,
      userId: '1',
      userName: '@travelblogger',
      createdAt: new Date().toISOString(),
      categories,
      savedCount: 0,
      isSaved: false,
    //   comments: [],
    };

    console.log('New post created:', newPost);
    toast.success('Travel post published successfully!');

    setTitle('');
    setDescription('');
    setLocation('');
    setCoverPhoto(undefined);
    setCategories([]);

    onClose?.();
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Create New Post</Typography>
        {onClose && (
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TitleSection title={title} onTitleChange={setTitle} />
          <CaptionSection description={description} onDescriptionChange={setDescription} />
          <CoverPhotoSection coverPhoto={coverPhoto} onCoverPhotoChange={setCoverPhoto} />
          <CategorySection categories={categories} onCategoryChange={setCategories} />
          <PostActions
            title={title}
            description={description}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPost;
