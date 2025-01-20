export interface MapLocation {
  name: string;
  url: string;
}

export interface MapProps {
  onLocationSelect?: (location: string) => void;
}