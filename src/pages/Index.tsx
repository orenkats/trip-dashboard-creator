import { BookmarkIcon, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DashboardForm from "@/components/dashboard/DashboardForm";
import { Dashboard } from "@/components/dashboard/types";

const Index = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  
  // This would eventually come from your backend
  const mockDashboards: Dashboard[] = [
    {
      id: "1",
      title: "Hidden Gems in Rome",
      description: "My favorite spots in the eternal city",
      coverPhoto: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      location: "Rome, Italy",
      authorId: "1",
      authorUsername: "@travelblogger",
      createdAt: new Date().toISOString(),
      subTopics: [],
      savedCount: 128,
      isSaved: false
    },
    {
      id: "2",
      title: "Koh Phangan Paradise",
      description: "Best beaches and secret spots",
      coverPhoto: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a",
      location: "Koh Phangan, Thailand",
      authorId: "1",
      authorUsername: "@travelblogger",
      createdAt: new Date().toISOString(),
      subTopics: [],
      savedCount: 85,
      isSaved: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-transparent bg-clip-text">
            Wanderlens
          </h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setShowNewDashboard(true)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              New Travel Post
            </Button>
            <span className="text-sm text-gray-500">@travelblogger</span>
          </div>
        </div>
      </nav>
      
      <main className="pt-20 pb-12 px-4">
        {showNewDashboard ? (
          <DashboardForm onClose={() => setShowNewDashboard(false)} />
        ) : (
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDashboards.map((dashboard) => (
              <div key={dashboard.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={dashboard.coverPhoto} 
                    alt={dashboard.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h2 className="text-xl font-semibold mb-1">{dashboard.title}</h2>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin size={14} />
                      {dashboard.location}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">{dashboard.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{dashboard.authorUsername}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={dashboard.isSaved ? "text-[#fd1d1d]" : "text-gray-500"}
                    >
                      <BookmarkIcon size={16} className="mr-1" />
                      {dashboard.savedCount}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;