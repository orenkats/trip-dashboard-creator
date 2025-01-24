// Type for predefined category types
export type CategoryType = 'Restaurants' | 'Spots' | 'Culture' | 'Hotels' | 'Hidden Gems' | 'Links';

// Type for a single place
export interface Place {
  id: string;          // Unique identifier for the place
  name: string;        // Name of the place
  location: string;    // Location or address of the place
  notes: string;       // Notes or description
  photos: string[];    // Array of photo URLs
}

// Type for a single category
export interface Category {
  id: string;          // Unique identifier for the category
  type: CategoryType;  // Type of the category (e.g., Restaurants)
  places: Place[];     // List of places in this category
}

// Type for a single comment
export interface Comment {
  id: string;          // Unique identifier for the comment
  content: string;     // Content of the comment
  userName: string;    // Username of the comment creator
  createdAt: string;   // Timestamp when the comment was created
}

// Type for a single post
export interface Post {
  id: string;          // Unique identifier for the post
  title: string;       // Title of the post
  description: string; // Description of the post
  coverPhoto?: string; // Optional cover photo URL
  location: string;    // Location for the post
  userId: string;      // User ID of the post creator
  userName: string;    // Username of the post creator
  createdAt: string;   // Timestamp when the post was created
  categories: Category[]; // List of categories in the post
  savedCount: number;  // Number of times this post was saved
  isSaved: boolean;    // Whether the current user has saved this post
}

// Type for user information
export interface User {
  id: string;          // Unique identifier for the user
  name: string;        // Name of the user
  avatarUrl?: string;  // Optional URL to the user's avatar
  bio?: string;        // Optional biography for the user
}

// Type for search results on the Discover page
export interface DiscoverSearchResults {
  posts: Post[];       // Array of posts matching the search
  users: User[];       // Array of users matching the search
  locations: string[]; // Array of matching locations
}
