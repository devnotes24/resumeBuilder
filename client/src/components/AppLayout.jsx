import { Box } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200, // Ensures the header is above other content
          backgroundColor: 'background.paper', // Ensure the header has a background
          boxShadow: 1 // Optional: Adds a subtle shadow below the header
        }}
      >
        <Header />
      </Box>
      <Box 
        sx={{
          marginTop: '64px', // Adjust based on the height of the Header
          minHeight: "100vh",
          paddingX: { xs: 0.5, sm: 2 },
          paddingY: 2,
          overflowY: 'auto', // Enables vertical scrolling
          backgroundColor: 'background.default' // Optional: Matches the page background
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default AppLayout;
