
// import { stringyfyData as userData } from "../../public/userData"; // Adjust the import path as necessary
import { Box, Grid, Typography, Card, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
// import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";

import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import { useResumeData } from "../hooks/useResumeData";
import SimpleBackDrop from './SimpleBackDrop';
const user = localStorage.getItem('user');
const email = JSON.parse(user)?.email;
const Resume2 = () => {
  const { resumeData , isFetching } = useResumeData(email);
  const userData = resumeData?.data?.user?.data[0] || {};
  // const userData =  {};
  return (
    <Box
      sx={{
        overflowX: "scroll",
        width: '210mm', // A4 width
        height: '297mm', // A4 height
        padding: 2,
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: 'auto',
      }}
    >
      <SimpleBackDrop loading={isFetching}/>
      <Card sx={{ padding: 4, height: '100%' }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', bgcolor: "#E9EFEC", m:-4 , py : 2}}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' , color : "#384B70"}}>
            {userData?.name ? userData.name : "Your Name"}
          </Typography>
          <Typography variant="subtitle1">
            {userData?.role ? userData.role : "Your Role"}
          </Typography>
        </Box>

        {/* Body Section */}
        <Grid container spacing={4} sx={{mt : 2}}>
          {/* Left Column */}
          <Grid item xs={4}>
            {/* Contact Section */}
            {(userData?.contactNo || userData?.email || userData?.address) &&  <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color : "#384B70"}}>
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

            {/* Skills Section */}
            {userData?.skills?.length > 0 && <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color : "#384B70" }}>
                SKILLS
              </Typography>
              <List>
                {userData?.skills?.map((skill) => (
                  <ListItem key={skill} disablePadding>
                    <ListItemIcon>
                        <FiberManualRecordTwoToneIcon
                          sx={{ color: "#666" ,width : "20px"}}
                        />
                      </ListItemIcon>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
            </Box>}

            {/* Languages Section */}
            {userData?.languages?.length > 0 && <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color : "#384B70"}}>
                LANGUAGES
              </Typography>
              <List>
                {userData?.languages?.map((language) => (
                  <ListItem key={language} disablePadding>
                    <ListItemIcon>
                        <FiberManualRecordTwoToneIcon
                          sx={{ color: "#666" ,width : "20px"}}
                        />
                      </ListItemIcon>
                    <ListItemText primary={language} />
                  </ListItem>
                ))}
              </List>
            </Box>}

            {/* Interests Section */}
            {userData?.interests?.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color : "#384B70"}}>
                  INTERESTS
                </Typography>
                <List>
                  {userData.interests.map((interest) => (
                    <ListItem key={interest} disablePadding>
                      <ListItemIcon>
                        <FiberManualRecordTwoToneIcon
                          sx={{ color: "#666" ,width : "20px"}}
                        />
                      </ListItemIcon>
                      <ListItemText primary={interest} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>

          {/* Right Column */}
          <Grid item xs={8}>
            {/* Profile Summary Section */}
            {userData?.profileSummary && <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color : "#384B70"}}>
                PROFILE SUMMARY
              </Typography>
              <Typography variant="body2">
                {userData.profileSummary || "Profile summary goes here."}
              </Typography>
            </Box>}

            {/* Work Experience Section */}
            {userData?.experience?.length>0 && <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color : "#384B70"}}>
                WORK EXPERIENCE
              </Typography>
              {userData.experience?.map((item) => (
                <Box key={item.company} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {item.company}
                  </Typography>
                  <Typography variant="body2">
                    {item.role} ({item.startDate} - {item.endDate})
                  </Typography>
                  <Typography variant="body2">
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>}

            {/* Education Section */}
            {userData?.education?.length>0 && <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color : "#384B70"}}>
                EDUCATION
              </Typography>
              {userData?.education?.map((item) => (
                <Typography key={item.educationLevel} variant="body2" sx={{mt : 2}}>
                  <strong>{item.educationLevel}</strong><br />
                  {item.institute} ({item.startYear} - {item.endYear})<br />
                  {item.percentage && (
                        <Typography
                          variant="body2"
                          sx={{  color: "#666" }}
                        >
                          Percentage : {item.percentage}
                        </Typography>
                      )}
                      {item.cgpa && (
                        <Typography
                          variant="body2"
                          sx={{ color: "#666" }}
                        >
                          CGPA : {item.cgpa}
                        </Typography>
                      )}
                </Typography>
                
              ))}
            </Box>}

            {/* Projects Section */}
            {userData?.projects?.length>0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , color : "#384B70"}}>
                  PROJECTS
                </Typography>
                {userData.projects.map((project) => (
                  <Box key={project.projectTitle} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {project.projectTitle}
                    </Typography>
                    <Typography variant="body2">{project.projectDescription}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Resume2;