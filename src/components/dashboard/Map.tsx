import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';

interface MapProps {
  onLocationSelect?: (location: string) => void;
}

const Map = ({ onLocationSelect }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [currentCoordinates, setCurrentCoordinates] = useState<{ lng: number; lat: number } | null>(null);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 1.5,
        center: [30, 15],
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.scrollZoom.disable();

      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      });

      // Add click event to get location
      map.current.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        setCurrentCoordinates({ lng, lat });
        
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
          );
          const data = await response.json();
          
          if (data.features && data.features.length > 0) {
            const locationName = data.features[0].place_name;
            onLocationSelect?.(locationName);
            toast.success(`Location selected: ${locationName}`);
          }
        } catch (error) {
          toast.error('Failed to get location details');
        }
      });

      setShowTokenInput(false);
      localStorage.setItem('mapbox_token', token);
      toast.success('Map initialized successfully!');
    } catch (error) {
      toast.error('Invalid Mapbox token. Please try again.');
    }
  };

  const handleShareOnGoogleMaps = () => {
    if (currentCoordinates) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${currentCoordinates.lat},${currentCoordinates.lng}`;
      window.open(googleMapsUrl, '_blank');
      toast.success('Opening location in Google Maps');
    } else {
      toast.error('Please select a location first');
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      initializeMap(savedToken);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 mb-2">
          Please enter your Mapbox public token to enable the map feature.
          You can get one at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="Enter your Mapbox public token"
            className="flex-1"
          />
          <button
            onClick={() => initializeMap(mapboxToken)}
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
        <div ref={mapContainer} className="absolute inset-0" />
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