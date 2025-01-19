import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';

interface MapProps {
  onLocationSelect?: (location: string) => void;
}

const Map = ({ onLocationSelect }: MapProps) => {
  const [googleMapsKey, setGoogleMapsKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
  };

  const defaultCenter = {
    lat: 30,
    lng: 15
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setSelectedPosition(position);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${googleMapsKey}`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const locationName = data.results[0].formatted_address;
        onLocationSelect?.(locationName);
        toast.success(`Location selected: ${locationName}`);
      }
    } catch (error) {
      toast.error('Failed to get location details');
    }
  };

  const handleShareOnGoogleMaps = () => {
    if (selectedPosition) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${selectedPosition.lat},${selectedPosition.lng}`;
      window.open(googleMapsUrl, '_blank');
      toast.success('Opening location in Google Maps');
    } else {
      toast.error('Please select a location first');
    }
  };

  const handleInitializeMap = (key: string) => {
    try {
      setGoogleMapsKey(key);
      setShowKeyInput(false);
      localStorage.setItem('google_maps_key', key);
      toast.success('Map initialized successfully!');
    } catch (error) {
      toast.error('Invalid Google Maps API key. Please try again.');
    }
  };

  if (showKeyInput) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 mb-2">
          Please enter your Google Maps API key to enable the map feature.
          You can get one at <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Cloud Console</a>
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            value={googleMapsKey}
            onChange={(e) => setGoogleMapsKey(e.target.value)}
            placeholder="Enter your Google Maps API key"
            className="flex-1"
          />
          <button
            onClick={() => handleInitializeMap(googleMapsKey)}
            className="px-4 py-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-md hover:opacity-90"
          >
            Initialize Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey={googleMapsKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedPosition || defaultCenter}
            zoom={selectedPosition ? 15 : 2}
            onClick={handleMapClick}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false
            }}
          >
            {selectedPosition && (
              <Marker
                position={selectedPosition}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <Button
        variant="outline"
        onClick={handleShareOnGoogleMaps}
        className="w-full flex items-center justify-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share on Google Maps
      </Button>
    </div>
  );
};

export default Map;