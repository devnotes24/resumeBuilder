
// import {  stringyfyData as userData } from "../../public/userData";
import {
  Box,
  Card,
  Grid,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { useState } from "react";
import { useResumeData } from "../hooks/useResumeData";
import SimpleBackDrop from "./SimpleBackDrop";
const user = localStorage.getItem('user');
const email = JSON.parse(user)?.email;
const Resume = () => {
  const { resumeData , isFetching } = useResumeData(email);
  console.log(email , resumeData);
  const userData = resumeData?.data?.user?.data[0] || {};
  const [imageSrc, setImageSrc] = useState("/profile-image.jpg");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Set the image source to the FileReader result
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    }
  };
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f9f9f9", // Light background regardless of theme
        minHeight: "100vh",
        color: "#000", // Ensure dark text
      }}
    >
       <input type="file" accept="image/*" onChange={handleImageChange} />
       <SimpleBackDrop loading={isFetching}/>
      <Card
        sx={{
          maxWidth: 900,
          margin: "auto",
          p: { xs: 2, md: 4 },
          backgroundColor: "#fff", // White background for the card
          color: "#000", // Ensure text is dark
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
        }}
      >
        <Grid container spacing={2} >
          {/* Left Side: Contact, Skills, Language, Interests */}
          <Grid item xs={4} md={4} sx={{bgcolor : "#E9EFEC" , borderRadius : "10px" }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                src={imageSrc} // Replace with actual image path
                sx={{
                  width: 120,
                  height: 120,
                  margin: "auto",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mt: 2, color: "#000" }}
              >
                {userData?.name ? userData?.name : ""}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#6f42c1" }}>
                {userData?.role ? userData?.role : ""}
              </Typography>
            </Box>

            {/* Contact Info */}
            {(userData?.email || userData?.contactNo || userData?.address)  && <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
              >
                CONTACT
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: "#666" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#000" }}>
                    {userData?.contactNo ? userData?.contactNo : ""}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding>
                  {userData?.email && (
                    <ListItemIcon>
                      <MailIcon sx={{ color: "#666" }} />
                    </ListItemIcon>
                  )}
                  <ListItemText sx={{ color: "#000" }}>
                    {userData?.email ? userData?.email : ""}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding>
                  {userData?.address && (
                    <ListItemIcon>
                      <HomeIcon sx={{ color: "#666" }} />
                    </ListItemIcon>
                  )}
                  <ListItemText sx={{ color: "#000" }}>
                    {userData?.address ? userData?.address : ""}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding>
                  {userData?.website && (
                    <ListItemIcon>
                      <LanguageIcon sx={{ color: "#666" }} />
                    </ListItemIcon>
                  )}
                  <ListItemText sx={{ color: "#000" }}>
                    {userData?.website ? userData?.website : ""}
                  </ListItemText>
                </ListItem>
              </List>
            </Box>}

            {/* Expertise Skills */}
            <Box sx={{ mb: 3 }}>
              {userData?.skills.length > 0 && (
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
                >
                  EXPERTISE SKILLS
                </Typography>
              )}
              <List dense>
                {userData?.skills?.map((skill) => (
                  <ListItem disablePadding key={skill}>
                    <ListItemIcon>
                      <RadioButtonCheckedOutlinedIcon sx={{ color: "#666" }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#000" }}>{skill}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Language Skills */}
            {userData?.languages?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
                >
                  LANGUAGE
                </Typography>
                <List dense>
                  {userData.languages.map((language) => (
                    <ListItem disablePadding key={language}>
                      <ListItemIcon>
                        <RadioButtonCheckedOutlinedIcon
                          sx={{ color: "#666" }}
                        />
                      </ListItemIcon>
                      <ListItemText sx={{ color: "#000" }}>
                        {language}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Interests */}
            {userData?.interests?.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
                >
                  INTERESTS
                </Typography>
                <List dense>
                  {userData.interests.map((interest) => (
                    <ListItem disablePadding key={interest}>
                      <ListItemIcon>
                        <RadioButtonCheckedOutlinedIcon
                          sx={{ color: "#666" }}
                        />
                      </ListItemIcon>
                      <ListItemText sx={{ color: "#000" }}>
                        {interest}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>

          {/* Right Side: Profile, Education, Experience */}
          <Grid item xs={8} md={8}>
            <Box sx={{ pl: { md: 4 }, color: "#000" }}>
              {/* Profile Section */}
              {userData?.profileSummary && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
                  >
                    PROFESSIONAL PROFILE
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333" }}>
                    {userData.profileSummary}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />


              {/* Project Section */}
              {userData?.projects?.length>0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
                  >
                    Projects
                  </Typography>
                  {userData.projects?.map((project) => (
                    <Box key={project.projectTitle}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        {project.projectTitle}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                        {project.projectDescription}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}



              {/* Education Section */}
              {userData?.education?.length>0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
                  >
                    EDUCATION
                  </Typography>
                  {userData.education?.map((item) => (
                    <Box key={item.educationLevel}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        {item.educationLevel}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                        {item.institute} ({item.startYear} - {item.endYear})
                      </Typography>
                      {item.place && (
                        <Typography
                          variant="body2"
                          sx={{ mb: 1, color: "#666" }}
                        >
                          - Place : {item.place}
                        </Typography>
                      )}
                      {item.percentage && (
                        <Typography
                          variant="body2"
                          sx={{ mb: 1, color: "#666" }}
                        >
                          - Percentage : {item.percentage}
                        </Typography>
                      )}
                      {item.cgpa && (
                        <Typography
                          variant="body2"
                          sx={{ mb: 1, color: "#666" }}
                        >
                          - CGPA : {item.cgpa}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Experience Section */}
              {userData.experience?.length>0 && (
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "#666" }}
                  >
                    EXPERIENCE
                  </Typography>
                  {userData.experience?.map((item) => (
                    <Box key={item.company}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        {item.company}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2, color: "#333" }}>
                    {item.role}
                  </Typography> 
                      <Typography variant="body2" sx={{ mb: 3, color: "#333" }}>
                    {item.description}
                  </Typography> 
                    </Box>
                  ))}
                  
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Resume;
