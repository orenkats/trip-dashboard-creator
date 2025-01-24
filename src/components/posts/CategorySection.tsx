import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface CategorySectionProps {
  categories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories, onCategoryChange }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleAddCategory = () => {
    if (inputValue.trim() && !categories.includes(inputValue)) {
      onCategoryChange([...categories, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteCategory = (category: string) => {
    onCategoryChange(categories.filter((cat) => cat !== category));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Add Category"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
        margin="normal"
      />
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onDelete={() => handleDeleteCategory(category)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategorySection;
