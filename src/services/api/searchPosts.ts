export const searchPosts = async (query: string) => {
    const response = await fetch(`/api/posts/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search posts');
    }
    return response.json();
  };
  