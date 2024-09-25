import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Resume() {
    const navigate = useNavigate();
    return (
        <Box sx={{ height: "80vh" , mt : 5 }}>
            <Box sx={{ my: "auto" }}>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: 800,
                        mb: 2, // Add margin-bottom for spacing
                    }}
                >
                    Pick one of the templates and build your resume in minutes
                </Typography>
                <Grid container spacing={5} justifyContent="center" sx={{mt : 3}}>
                    <Grid item xs={12} sm={3}>
                        <Box 
                            sx={{
                                boxShadow: 3, // Add box shadow
                                borderRadius: 2, // Optional: round the corners
                                overflow: "hidden", // Ensures image fits within rounded corners
                                cursor: "pointer",
                                transition: "transform 0.5s ease", // Add transition for scaling
                                "&:hover": {
                                    transform: "scale(1.1)", // Scale on hover
                                },
                            }}
                            onClick = {() => navigate("/resume1")}
                        >
                            <img src="Resume1.png" alt="Resume 1" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box
                            sx={{
                                boxShadow: 3, // Add box shadow
                                borderRadius: 2, // Optional: round the corners
                                overflow: "hidden", // Ensures image fits within rounded corners
                                cursor: "pointer",
                                transition: "transform 0.5s ease", // Add transition for scaling
                                "&:hover": {
                                    transform: "scale(1.1)", // Scale on hover
                                },
                            }}
                            onClick = {() => navigate("/resume2")}
                        >
                            <img src="Resume2.png" alt="Resume 2" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Resume;
