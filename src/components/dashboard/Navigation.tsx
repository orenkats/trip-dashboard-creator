import { Home, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onNewPost?: () => void;
}

export const Navigation = ({ onNewPost }: NavigationProps) => {
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
        <div className="flex items-center gap-4">
          {onNewPost && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={onNewPost}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              New Travel Post
            </Button>
          )}
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};