export type SubTopicType = 'Restaurants' | 'Spots' | 'Culture';

export interface Place {
  id: string;
  name: string;
  location: string;
  notes: string;
  photos: string[];
}

export interface SubTopic {
  id: string;
  type: SubTopicType;
  places: Place[];
}