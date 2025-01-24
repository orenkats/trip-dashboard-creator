import React from "react";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

interface PostFilterProps {
  sortBy: string;
  location: string;
  sortOptions: { value: string; label: string }[];
  locationOptions: { value: string; label: string }[];
  onSortChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const PostFilter: React.FC<PostFilterProps> = ({
  sortBy,
  location,
  sortOptions,
  locationOptions,
  onSortChange,
  onLocationChange,
}) => {
  return (
    <Box display="flex" gap={2} alignItems="center">
      <FormControl sx={{ flex: 1 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          label="Sort By"
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ flex: 1 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          label="Location"
        >
          {locationOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PostFilter;
