import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostHeader } from "./PostHeader";
import { Post } from "../../types/post";
import { PostContent } from "./PostContent";
import { Comments } from "./Comments";

const PostDetailView = () => {
  const { id } = useParams<{ id: string }>(); // Get post ID from route
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Simulate fetching post data
  useEffect(() => {
    async function fetchPost() {
      // Replace with your API call or data fetching logic
      const postData = await fetch(`/api/posts/${id}`).then((res) => res.json());
      setCurrentPost(postData);
    }
    fetchPost();
  }, [id]);

  // Handlers
  const handleSaveEdit = () => {
    console.log("Save edit clicked!");
    // Add your save logic here
  };

  const handleBookmark = () => {
    console.log("Bookmark toggled!");
    // Add your bookmark logic here
  };

  const handleAddComment = (content: string) => {
    console.log("Adding comment:", content);
    // Add your comment logic here
  };

  // Render loading state
  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 overflow-hidden">
      <div className="relative h-48 sm:h-64 md:h-72 -mx-6 -mt-6">
        <img
          src={currentPost.coverPhoto}
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-2">
        <PostHeader
          title={currentPost.title}
          isEditing={isEditing}
          editedTitle={currentPost.title}
          isSaved={currentPost.isSaved || false}
          userId={currentPost.userId}
          username={currentPost.userName}
          onEditedTitleChange={() => {}}
          onSaveEdit={handleSaveEdit}
          onToggleEdit={() => setIsEditing(true)}
          onBookmark={handleBookmark}
          onClose={() => {}}
          isCurrentUserPost={currentPost.userId === "1"} // Replace with actual user logic
        />

        <div className="text-gray-700 mt-6">
          {currentPost.description}
        </div>

        <PostContent categories={currentPost.categories} />

        <Comments 
          comments={currentPost.comments}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
};

export default PostDetailView;
