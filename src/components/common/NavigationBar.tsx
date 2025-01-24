import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ExploreIcon from "@mui/icons-material/Explore";
import CreateNewPost from "../posts/CreateNewPost";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleNewPostClick = () => {
    setIsPostFormOpen(true);
  };

  const handleClosePostForm = () => {
    setIsPostFormOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Home Button */}
          <Button
            startIcon={<ExploreIcon />}
            onClick={() => handleNavigation("/")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "primary.main",
            }}
          >
            TravelNotes
          </Button>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Tooltip title="Discover">
              <IconButton
                color="default"
                onClick={() => handleNavigation("/discover")}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="New Travel Post">
              <IconButton
                color="default"
                onClick={handleNewPostClick}
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="New Travel Post">
              <IconButton
                color="default"
                onClick={handleNewPostClick}
                sx={{ display: { xs: "inline-flex", sm: "none" } }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton
                color="default"
                onClick={() => handleNavigation("/profile")}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* PostForm Modal */}
      <Modal open={isPostFormOpen} onClose={handleClosePostForm}>
        <Box sx={modalStyle}>
          <CreateNewPost onClose={handleClosePostForm} />
        </Box>
      </Modal>
    </>
  );
};

export default NavigationBar;
