export const fetchCategories = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  };
  