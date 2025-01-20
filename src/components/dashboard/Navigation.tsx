import { Compass, Plus, User, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onNewPost?: () => void;
  onProfileClick?: () => void;
}

export const Navigation = ({ onNewPost, onProfileClick }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === "/";

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();  // First close the modal if it's open
    }
    navigate("/profile"); // Then navigate to profile
  };

  const handleDiscoverClick = () => {
    navigate("/discover");
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 w-full z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={handleHomeClick}
        >
          <Compass size={24} className="text-[#7C8363]" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#7C8363] via-[#9CA38A] to-[#B5BCA1] text-transparent bg-clip-text">
            Exploria
          </h1>
        </Button>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            onClick={handleDiscoverClick}
          >
            <Search size={20} />
          </Button>
          {onNewPost && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={onNewPost}
              className="hidden sm:flex items-center gap-2"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Travel Post</span>
            </Button>
          )}
          {onNewPost && (
            <Button 
              variant="ghost"
              size="icon"
              onClick={onNewPost}
              className="sm:hidden h-9 w-9"
            >
              <Plus size={20} />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            onClick={handleProfileClick}
          >
            <User size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};