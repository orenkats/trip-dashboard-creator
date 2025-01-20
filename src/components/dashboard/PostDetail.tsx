import { Dashboard } from './types';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { PlaceDetail } from './PlaceDetail';
import { Comments } from './Comments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostHeader } from './PostHeader';
import { PostCoverSection } from './PostCoverSection';
import { usePostEdit } from './hooks/usePostEdit';
import CategorySection from './CategorySection';
import CaptionSection from './CaptionSection';
import CoverPhotoSection from './CoverPhotoSection';
import LocationSection from './LocationSection';
import TitleSection from './TitleSection';

interface PostDetailProps {
  post: Dashboard;
  onClose: () => void;
}

export const PostDetail = ({ post, onClose }: PostDetailProps) => {
  const {
    currentPost,
    isEditing,
    editedTitle,
    editedDescription,
    editedLocation,
    editedSubTopics,
    setEditedTitle,
    setEditedDescription,
    setEditedLocation,
    setEditedSubTopics,
    setIsEditing,
    handleSaveEdit,
    handleBookmark,
    handleAddComment,
  } = usePostEdit(post);

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
        <PostHeader
          title={currentPost.title}
          isEditing={isEditing}
          editedTitle={editedTitle}
          isSaved={currentPost.isSaved || false}
          authorId={currentPost.authorId}
          onEditedTitleChange={setEditedTitle}
          onSaveEdit={handleSaveEdit}
          onToggleEdit={() => setIsEditing(false)}
          onBookmark={handleBookmark}
          onClose={onClose}
        />

        <TitleSection 
          title={editedTitle}
          onTitleChange={setEditedTitle}
        />

        <CaptionSection 
          description={editedDescription}
          onDescriptionChange={setEditedDescription}
        />

        <CoverPhotoSection 
          coverPhoto={currentPost.coverPhoto}
          onCoverPhotoChange={() => {}}
        />

        <CategorySection 
          subTopics={editedSubTopics}
          onSubTopicsChange={setEditedSubTopics}
        />

        <LocationSection
          location={editedLocation}
          onLocationChange={setEditedLocation}
          onLocationSelect={setEditedLocation}
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <PostHeader
        title={currentPost.title}
        isEditing={isEditing}
        editedTitle={editedTitle}
        isSaved={currentPost.isSaved || false}
        authorId={currentPost.authorId}
        onEditedTitleChange={setEditedTitle}
        onSaveEdit={handleSaveEdit}
        onToggleEdit={() => setIsEditing(true)}
        onBookmark={handleBookmark}
        onClose={onClose}
      />
      
      <PostCoverSection
        coverPhoto={currentPost.coverPhoto || ''}
        description={currentPost.description}
        location={currentPost.location}
        isEditing={isEditing}
        editedDescription={editedDescription}
        editedLocation={editedLocation}
        onEditedDescriptionChange={setEditedDescription}
        onEditedLocationChange={setEditedLocation}
      />

      <ScrollArea className="h-[calc(100vh-400px)]">
        <Tabs defaultValue={currentPost.subTopics[0]?.type} className="w-full">
          <TabsList className="mb-4">
            {currentPost.subTopics.map((subTopic) => (
              <TabsTrigger key={subTopic.id} value={subTopic.type}>
                {subTopic.type}
              </TabsTrigger>
            ))}
          </TabsList>

          {currentPost.subTopics.map((subTopic) => (
            <TabsContent key={subTopic.id} value={subTopic.type}>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subTopic.places.map((place) => (
                      <PlaceDetail key={place.id} place={place} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <Card className="mt-6">
          <CardContent className="pt-6">
            <Comments 
              comments={currentPost.comments || []} 
              onAddComment={handleAddComment}
            />
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};