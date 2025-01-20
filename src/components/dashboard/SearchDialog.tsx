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
      <DialogContent className="sm:max-w-[425px]">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>
        
        <div className="mt-4 space-y-2">
          {searchQuery && filteredResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              {result.type === "user" ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-gray-500">{result.username}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{result.title}</p>
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