export type SubTopicType = 'Restaurants' | 'Spots' | 'Culture' | 'Hotels' | 'Hidden Gems' | 'Links';

export interface Comment {
  id: string;
  content: string;
  authorUsername: string;
  createdAt: string;
}

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

export interface Post {
  id: string;
  title: string;
  description: string;
  coverPhoto?: string;
  location: string;
  authorId: string;
  authorUsername: string;
  createdAt: string;
  subTopics: SubTopic[];
  savedCount: number;
  isSaved: boolean;
  comments: Comment[];
}

export interface NavigationProps {
  onNewPost?: () => void;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
}

export interface ActionButtonsProps {
  title: string;
  description: string;
  location: string;
  onSaveDraft: () => void;
  onPublish: () => void;
}