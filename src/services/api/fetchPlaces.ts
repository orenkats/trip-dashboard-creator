export const fetchPlaces = async (categoryId: string, location: string) => {
    const response = await fetch(`/api/places?category=${categoryId}&location=${location}`);
    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }
    return response.json();
  };
  