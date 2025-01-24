import React from 'react';
import { useFetchCategories } from '@/hooks/useFetchCategories';

interface PostDetailProps {
  postId: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const { data: categories, isLoading, error } = useFetchCategories(postId);

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <div>
      <h2>Categories</h2>
      {categories?.map((category) => (
        <div key={category.id}>
          <h3>{category.type}</h3>
          <ul>
            {category.places.map((place) => (
              <li key={place.id}>{place.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
