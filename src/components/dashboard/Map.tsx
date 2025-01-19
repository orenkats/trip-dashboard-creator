import React, { useState } from 'react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Share2, MapPin } from 'lucide-react';

interface MapProps {
  onLocationSelect?: (location: string) => void;
}

const Map = ({ onLocationSelect }: MapProps) => {
  const [mapsUrl, setMapsUrl] = useState('');
  const [location, setLocation] = useState('');

  const handleMapsUrlSubmit = () => {
    if (!mapsUrl) {
      toast.error('Please enter a Google Maps URL');
      return;
    }

    try {
      // Extract location name from the URL if possible
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

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">Share your Google Maps location</p>
        </div>
        
        <div className="space-y-2">
          <Input
            value={mapsUrl}
            onChange={(e) => setMapsUrl(e.target.value)}
            placeholder="Paste your Google Maps URL here"
            className="w-full"
          />
          <Button
            onClick={handleMapsUrlSubmit}
            className="w-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90"
          >
            Add Location
          </Button>
        </div>

        {location && (
          <div className="pt-2">
            <p className="text-sm text-gray-600">Selected location:</p>
            <p className="font-medium">{location}</p>
          </div>
        )}
      </div>

      {mapsUrl && (
        <Button
          variant="outline"
          onClick={handleShareOnGoogleMaps}
          className="w-full flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Open in Google Maps
        </Button>
      )}
    </div>
  );
};

export default Map;