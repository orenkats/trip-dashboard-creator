import { Post } from './dashboard';

export interface ProfileState {
  showNewDashboard: boolean;
  selectedPost: Post | null;
  posts: Post[];
  savedPosts: Post[];
}

export interface ProfileActions {
  setShowNewDashboard: (show: boolean) => void;
  setSelectedPost: (post: Post | null) => void;
  handleSavePost: (post: Post) => void;
}

export type ProfileData = ProfileState & ProfileActions;