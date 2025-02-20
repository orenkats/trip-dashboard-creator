import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Share2, Navigation } from 'lucide-react';
import { MapProps } from './types/map';
import { useMapLocation } from './hooks/useMapLocation';

const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const {
    mapsUrl,
    setMapsUrl,
    location,
    handleMapsUrlSubmit,
    handleShareOnGoogleMaps
  } = useMapLocation(onLocationSelect);

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Navigation className="w-4 h-4" />
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
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            Share Map
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
          className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 hover:border-gray-900"
        >
          <Share2 className="w-4 h-4" />
          Open in Google Maps
        </Button>
      )}
    </div>
  );
};

export default Map;