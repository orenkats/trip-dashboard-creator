import { useState } from 'react';
import { toast } from 'sonner';
import { MapLocation } from '../types/map';

export const useMapLocation = (onLocationSelect?: (location: string) => void) => {
  const [mapsUrl, setMapsUrl] = useState('');
  const [location, setLocation] = useState('');

  const handleMapsUrlSubmit = () => {
    if (!mapsUrl) {
      toast.error('Please enter a Google Maps URL');
      return;
    }

    try {
      const locationName = decodeURIComponent(mapsUrl.split('/')[5] || 'Selected Location');
      setLocation(locationName);
      onLocationSelect?.(locationName);
      toast.success('Location added successfully');
    } catch (error) {
      toast.error('Invalid Google Maps URL');
    }
  };

  const handleShareOnGoogleMaps = () => {
    if (mapsUrl) {
      window.open(mapsUrl, '_blank');
      toast.success('Opening location in Google Maps');
    } else {
      toast.error('Please add a Google Maps link first');
    }
  };

  return {
    mapsUrl,
    setMapsUrl,
    location,
    handleMapsUrlSubmit,
    handleShareOnGoogleMaps
  };
};