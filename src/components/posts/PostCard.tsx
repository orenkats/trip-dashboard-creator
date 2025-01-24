import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Post } from "@/services/types";

interface PostCardProps {
  post: Post;
  onPostClick: (post: Post) => void;
  onSavePost?: (post: Post) => void;
  isCurrentUser: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPostClick,
  onSavePost,
  isCurrentUser,
}) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSavePost) onSavePost(post);
  };

  return (
    <Card sx={{ position: "relative", boxShadow: 2 }}>
      <CardActionArea onClick={() => onPostClick(post)}>
        <CardMedia
          component="img"
          height="140"
          image={post.coverPhoto}
          alt={post.title}
        />
        <CardContent>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationOnIcon fontSize="small" />
            {post.location}
          </Typography>
        </CardContent>
      </CardActionArea>
      {isCurrentUser && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onPostClick(post);
          }}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <EditIcon />
        </IconButton>
      )}
      <IconButton
        onClick={handleSaveClick}
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          color: post.isSaved ? "error.main" : "text.secondary",
        }}
      >
        <BookmarkIcon />
      </IconButton>
    </Card>
  );
};
