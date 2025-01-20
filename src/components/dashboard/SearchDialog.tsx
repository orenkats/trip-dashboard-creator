import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, User, MapPin } from "lucide-react";
import { Dashboard } from "./types";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for demonstration - in a real app, this would come from an API
  const searchResults = [
    {
      id: "1",
      type: "user",
      username: "@traveler",
      name: "World Traveler"
    },
    {
      id: "2",
      type: "post",
      title: "Amazing Paris Trip",
      location: "Paris, France"
    }
  ];

  const filteredResults = searchResults.filter((result) => {
    const searchTerm = searchQuery.toLowerCase();
    if (result.type === "user") {
      return result.username.toLowerCase().includes(searchTerm) || 
             result.name.toLowerCase().includes(searchTerm);
    }
    return result.title.toLowerCase().includes(searchTerm) || 
           result.location.toLowerCase().includes(searchTerm);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden bg-white/80 backdrop-blur-lg border border-gray-200">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search users or posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {searchQuery && filteredResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50/80 transition-colors cursor-pointer border-t border-gray-100 first:border-t-0"
            >
              {result.type === "user" ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{result.name}</p>
                    <p className="text-sm text-gray-500">{result.username}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{result.title}</p>
                    <p className="text-sm text-gray-500">{result.location}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};