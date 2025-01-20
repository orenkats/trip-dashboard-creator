import { toast } from 'sonner';

export const parseGoogleMapsUrl = (url: string): string | null => {
  try {
    return decodeURIComponent(url.split('/')[5] || 'Selected Location');
  } catch (error) {
    console.error('Error parsing Google Maps URL:', error);
    return null;
  }
};

export const validateLocation = (location: string | null): boolean => {
  if (!location) {
    toast.error('Please add a location to your travel post');
    return false;
  }
  return true;
};

export const validateTravelPost = (title: string, description: string, location: string): boolean => {
  if (!title) {
    toast.error("Please add a title to your travel post");
    return false;
  }
  if (!description) {
    toast.error("Please add a description to your travel post");
    return false;
  }
  if (!location) {
    toast.error("Please add a location to your travel post");
    return false;
  }
  return true;
};