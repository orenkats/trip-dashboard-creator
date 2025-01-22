import React from 'react';
import { Button } from "../ui/button";
import { CategoryList } from './CategoryList';
import { toast } from 'sonner';
import { Category, CategoryType } from './types';
import { Box, Pencil } from 'lucide-react';
import styles from './styles/dashboard.module.css';

interface CategorySectionProps {
  categories: Category[];
  onCategoryChange: (categories: Category[]) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories, onCategoryChange }) => {
  const handleAddCategory = (type: CategoryType) => {
    if (categories.some(st => st.type === type)) {
      toast.error(`${type} section already exists`);
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      type: type,
      places: []
    };
    onCategoryChange([...categories, newCategory]);
    toast.success(`${type} section added`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {(['Restaurants', 'Spots', 'Culture', 'Hotels', 'Hidden Gems', 'Links'] as CategoryType[]).map((type) => (
          <Button
            key={type}
            variant="outline"
            onClick={() => handleAddCategory(type)}
            className={styles.addButton}
            disabled={categories.some(st => st.type === type)}
          >
            {type}
          </Button>
        ))}
      </div>
      <CategoryList 
        categories={categories} 
        setCategories={onCategoryChange}
      />
    </div>
  );
};

export default CategorySection;