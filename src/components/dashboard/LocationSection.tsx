import React from 'react';
import { Input } from '../ui/input';
import Map from './Map';
import { Label } from '../ui/label';

interface LocationSectionProps {
  location: string;
  onLocationChange: (location: string) => void;
  onLocationSelect: (location: string) => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  location,
  onLocationChange,
  onLocationSelect
}) => {
  return (
    <div className="mb-8">
      <Label className="text-base font-medium text-gray-900 mb-2 block">Map</Label>
      <div className="space-y-4">
        <Map onLocationSelect={onLocationSelect} />
        <Input
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Click on the map or type the location"
          className="w-full text-lg bg-gray-50/50 border-gray-200"
        />
      </div>
    </div>
  );
};

export default LocationSection;