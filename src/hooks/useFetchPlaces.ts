import { useQuery } from '@tanstack/react-query';
import { fetchPlaces } from '../services/api/fetchPlaces';
import { Place } from '../services/types';

export const useFetchPlaces = (categoryId: string, location: string) => {
  return useQuery({
    queryKey: ['places', categoryId, location], // Unique key with dynamic params
    queryFn: () => fetchPlaces(categoryId, location), // Fetch function
    enabled: !!categoryId && !!location, // Ensure params are provided
  });
};
