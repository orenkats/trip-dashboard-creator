import { Home, Plus, User, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onNewPost?: () => void;
  onProfileClick?: () => void;
}

export const Navigation = ({ onNewPost, onProfileClick }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === "/";

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    }
    navigate("/profile");
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 w-full z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <Home size={24} className="text-[#fd1d1d]" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-transparent bg-clip-text">
              Wanderlens
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/discover">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search size={20} />
            </Button>
          </Link>
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