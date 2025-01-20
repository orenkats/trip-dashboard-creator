import { Place } from './types';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface PlaceDetailProps {
  place: Place;
}

export const PlaceDetail = ({ place }: PlaceDetailProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">{place.name}</h4>
        <p className="text-sm text-gray-500 mb-2">{place.location}</p>
        <p className="text-sm mb-4">{place.notes}</p>
        {place.photos.length > 0 && (
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <div className="space-y-2 p-2">
              {place.photos.map((photo, index) => (
                <div key={index} className="relative aspect-video">
                  <img 
                    src={photo} 
                    alt={`${place.name} photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};