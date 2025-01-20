export interface Place {
  id: string;
  name: string;
  location: string;
  notes: string;
  photos: string[];
}

export interface SubTopic {
  id: string;
  type: string;
  places: Place[];
}

export interface Comment {
  id: string;
  content: string;
  authorUsername: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  coverPhoto: string;
  location: string;
  authorId: string;
  authorUsername: string;
  createdAt: string;
  subTopics: SubTopic[];
  savedCount: number;
  isSaved: boolean;
  comments: Comment[];
}