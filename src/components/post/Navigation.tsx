import React from 'react';
import { Compass, Plus, User, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { NavigationProps } from '../../types/post';

export const Navigation: React.FC<NavigationProps> = ({ 
  onNewPost, 
  onProfileClick, 
  onHomeClick 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    onHomeClick?.();
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleProfileClick = () => {
    onProfileClick?.();
    navigate("/profile");
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
          <Compass size={24} className="text-emerald-400" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
            TravelNotes
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
            <>
              <Button 
                variant="ghost"
                size="sm"
                onClick={onNewPost}
                className="hidden sm:flex items-center gap-2"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Travel Post</span>
              </Button>
              <Button 
                variant="ghost"
                size="icon"
                onClick={onNewPost}
                className="sm:hidden h-9 w-9"
              >
                <Plus size={20} />
              </Button>
            </>
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