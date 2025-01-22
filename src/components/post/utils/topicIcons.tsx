import { CategoryType } from '../types';
import { Compass, Utensils, Landmark, Hotel, Gem, Link } from 'lucide-react';

export const getCategoryIcon = (type: CategoryType) => {
  switch (type) {
    case 'Restaurants':
      return <Utensils className="w-4 h-4" />;
    case 'Spots':
      return <Compass className="w-4 h-4" />;
    case 'Culture':
      return <Landmark className="w-4 h-4" />;
    case 'Hotels':
      return <Hotel className="w-4 h-4" />;
    case 'Hidden Gems':
      return <Gem className="w-4 h-4" />;
    case 'Links':
      return <Link className="w-4 h-4" />;
    default:
      return <Compass className="w-4 h-4" />;
  }
};