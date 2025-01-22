import React from 'react';
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
      </div>
    </div>
  );
};

export default LocationSection;