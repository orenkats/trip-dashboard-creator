import { Place } from './types';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

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
          <Carousel className="w-full max-w-[300px] mx-auto md:max-w-full">
            <CarouselContent>
              {place.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[4/3] md:aspect-video">
                    <img 
                      src={photo} 
                      alt={`${place.name} photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {place.photos.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
};