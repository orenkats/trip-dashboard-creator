import Grid from "@mui/material/Grid";
import { Post } from "@/services/types";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  isCurrentUser?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, isCurrentUser }) => {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <PostCard
            post={post}
            onPostClick={onPostClick}
            isCurrentUser={isCurrentUser || false}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
