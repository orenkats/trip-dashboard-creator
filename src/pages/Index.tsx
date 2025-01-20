import { BookmarkIcon, MapPin, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DashboardForm from "@/components/dashboard/DashboardForm";
import { Dashboard, SubTopicType } from "@/components/dashboard/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Dashboard | null>(null);
  
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
      subTopics: [
        {
          id: "st1",
          type: "Restaurants" as SubTopicType,
          places: [
            {
              id: "p1",
              name: "Roscioli Restaurant",
              location: "Via dei Giubbonari, 21/22, Rome",
              notes: "Amazing pasta carbonara and wine selection. Make reservations!",
              photos: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0"]
            },
            {
              id: "p2",
              name: "Salumeria Roscioli",
              location: "Via dei Giubbonari, 21/22, Rome",
              notes: "Best cheese and cured meats. Try the burrata!",
              photos: ["https://images.unsplash.com/photo-1466637574441-749b8f19452f"]
            }
          ]
        },
        {
          id: "st2",
          type: "Spots" as SubTopicType,
          places: [
            {
              id: "p3",
              name: "Giardino degli Aranci",
              location: "Piazza Pietro D'Illiria, Rome",
              notes: "Beautiful orange garden with amazing view of the city",
              photos: ["https://images.unsplash.com/photo-1529260830199-42c24126f198"]
            }
          ]
        },
        {
          id: "st3",
          type: "Culture" as SubTopicType,
          places: [
            {
              id: "p4",
              name: "Galleria Borghese",
              location: "Piazzale Scipione Borghese, 5, Rome",
              notes: "Book tickets in advance. Amazing Bernini sculptures.",
              photos: ["https://images.unsplash.com/photo-1626259809136-c2f772c9c29e"]
            }
          ]
        }
      ],
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
      subTopics: [
        {
          id: "st4",
          type: "Spots" as SubTopicType,
          places: [
            {
              id: "p5",
              name: "Secret Beach",
              location: "North Coast, Koh Phangan",
              notes: "Hidden gem with crystal clear water. Access through jungle path.",
              photos: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"]
            },
            {
              id: "p6",
              name: "Bottle Beach",
              location: "Northeast Coast, Koh Phangan",
              notes: "Pristine beach only accessible by boat or hiking",
              photos: ["https://images.unsplash.com/photo-1519046904884-53103b34b206"]
            }
          ]
        }
      ],
      savedCount: 85,
      isSaved: true
    }
  ];

  const handlePostClick = (post: Dashboard) => {
    setSelectedPost(post);
  };

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
        ) : selectedPost ? (
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{selectedPost.title}</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedPost(null)}
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="aspect-[21/9] relative rounded-xl overflow-hidden mb-6">
              <img 
                src={selectedPost.coverPhoto} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-lg mb-2">{selectedPost.description}</p>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {selectedPost.location}
                </div>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-400px)]">
              {selectedPost.subTopics.map((subTopic) => (
                <Card key={subTopic.id} className="mb-6">
                  <CardHeader>
                    <CardTitle>{subTopic.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subTopic.places.map((place) => (
                        <Card key={place.id}>
                          <CardContent className="p-4">
                            <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
                              <img 
                                src={place.photos[0]} 
                                alt={place.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-semibold mb-1">{place.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">{place.location}</p>
                            <p className="text-sm">{place.notes}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDashboards.map((dashboard) => (
              <div 
                key={dashboard.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePostClick(dashboard)}
              >
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