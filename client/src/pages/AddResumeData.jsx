import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useResumeData } from "../hooks/useResumeData";
import SimpleBackDrop from "../components/SimpleBackDrop";
import toast from "react-hot-toast";
const user = localStorage.getItem("user");
const email = JSON.parse(user)?.email;
const AddResumeData = () => {
  const { resumeData, isFetching , updateResumeData , isUpdating} = useResumeData(email);

  const [userData, setUserData] = useState({
    name: "",
    DOB: "",
    email: "",
    contactNo: "",
    website: "",
    linkedIn: "",
    role: "",
    address: "",
    profileSummary: "",
    skills: [],
    languages: [],
    interests: [],
    education: [],
    experience: [],
    projects: [],
  });

  useEffect(() => {
    if (!isFetching && resumeData) {
      const data = resumeData.data?.user?.data[0] || {};
      setEducation(data.education || []);
      setExperience(data.experience || []);
      setProjects(data.projects || []);

      setUserData((prevState) => ({
        ...prevState,
        name: data.name || "",
        DOB: data.DOB || "",
        email: data.email || "",
        contactNo: data.contactNo || "",
        website: data.website || "",
        linkedIn: data.linkedIn || "",
        role: data.role || "",
        address: data.address || "",
        profileSummary: data.profileSummary || "",
        skills: Array.isArray(data.skills) ? data.skills : [],
        languages: Array.isArray(data.languages) ? data.languages : [],
        interests: Array.isArray(data.interests) ? data.interests : [],
        education: Array.isArray(data.education) ? data.education : [],
        experience: Array.isArray(data.experience) ? data.experience : [],
        projects: Array.isArray(data.projects) ? data.projects : [],
      }));
    }
  }, [resumeData, isFetching]);

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleArrayChange = (index, value, type) => {
    const updatedArray = [...userData[type]];
    updatedArray[index] = value;
    setUserData({ ...userData, [type]: updatedArray });
  };

  const handleAddToArray = (type) => {
    if (type === "skills" || type === "languages" || type === "interests") {
      setUserData({ ...userData, [type]: [...userData[type], ""] });
    } else if (type === "education") {
      setEducation([
        ...education,
        {
          institute: "",
          startYear: "",
          endYear: "",
          percentage: "",
          branch: "",
        },
      ]);
    } else if (type === "experience") {
      setExperience([
        ...experience,
        { company: "", startDate: "", endDate: "", role: "", description: "" },
      ]);
    } else if (type === "projects") {
      setProjects([...projects, { projectTitle: "", projectDescription: "" }]);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEdu = [...education];
    updatedEdu[index][field] = value;
    setEducation(updatedEdu);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...experience];
    updatedExp[index][field] = value;
    setExperience(updatedExp);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleRemoveFromArray = (index, type) => {
    if (type === "skills" || type === "languages" || type === "interests") {
      const updatedArray = [...userData[type]];
      updatedArray.splice(index, 1);
      setUserData({ ...userData, [type]: updatedArray });
    } else if (type === "education") {
      const updatedEdu = [...education];
      updatedEdu.splice(index, 1);
      setEducation(updatedEdu);
    } else if (type === "experience") {
      const updatedExp = [...experience];
      updatedExp.splice(index, 1);
      setExperience(updatedExp);
    } else if (type === "projects") {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...userData,
      education,
      experience,
      projects,
    };
    if(!finalData.name){
        toast.error("Name is required");
        return
    }
    else{
        console.log("This is running....");
        updateResumeData([email , JSON.stringify(finalData)])
    }
    // console.log(finalData);
    // console.log(JSON.stringify(finalData));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "100%", mx: "auto", mt: 2, px: 2 }}
    >
      <SimpleBackDrop loading={isFetching || isUpdating} />
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        User Data Form
      </Typography>
      <Typography variant="h5" sx={{ display: "block", my: 2 }}>
        Personal Data
      </Typography>
      <Grid container spacing={2}>
        {[
          "name",
          "DOB",
          "email",
          "contactNo",
          "role",
          "address",
          "linkedIn",
          "website",
        ].map((field) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={field}>
            <TextField
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              fullWidth
              size="small"
              value={userData[field]} // Changed to value
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 3, mb: 3 }}>
            Profile Summary
          </Typography>
          <TextField
            label="Profile Summary"
            name="profileSummary"
            fullWidth
            size="small"
            value={userData.profileSummary} // Changed to value
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>
      </Grid>

      <Grid item xs={6} sm={4} md={3}>
        {["skills", "languages", "interests"].map((type) => (
          <div key={type}>
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
            {userData[type].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <TextField
                  label={`${
                    type.slice(0, -1).charAt(0).toUpperCase() +
                    type.slice(0, -1).slice(1)
                  } ${index + 1}`}
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, type)
                  }
                  size="small"
                  sx={{ mr: 1, maxWidth: "330px" }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFromArray(index, type)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleAddToArray(type)}
              sx={{ mt: 1 }}
            >
              + Add {type.slice(0, -1)}
            </Button>
          </div>
        ))}
      </Grid>

      {/* Education Section
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Education
      </Typography>
      {education.map((edu, index) => (
        <Box key={index} sx={{ mb: 2, mt: 3 }}>
          <Typography sx={{ mt: 6 }}>
            Education Details {index + 1}
            <IconButton
              size="small"
              onClick={() => handleRemoveFromArray(index, "education")}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={6}>
              <TextField
                label="Institute"
                value={edu.institute}
                onChange={(e) =>
                  handleEducationChange(index, "institute", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2} lg={3}>
              <TextField
                label="Start Year"
                value={edu.startYear}
                onChange={(e) =>
                  handleEducationChange(index, "startYear", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2} lg={3}>
              <TextField
                label="End Year"
                value={edu.endYear}
                onChange={(e) =>
                  handleEducationChange(index, "endYear", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <TextField
                label="Branch"
                value={edu.branch}
                onChange={(e) =>
                  handleEducationChange(index, "branch", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                label="Percentage"
                value={edu.percentage}
                onChange={(e) =>
                  handleEducationChange(index, "percentage", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="outlined" onClick={() => handleAddToArray("education")}>
        + Add Education
      </Button> */}

      {/* Education Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Education
      </Typography>
      {education.map((edu, index) => (
        <Box key={index} sx={{ mb: 2, mt: 3 }}>
          <Typography sx={{ mt: 6, mb: 1 }}>
            Education Details {index + 1}
            <IconButton
              size="small"
              onClick={() => handleRemoveFromArray(index, "education")}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={6}>
              <TextField
                label="Institute"
                value={edu.institute}
                onChange={(e) =>
                  handleEducationChange(index, "institute", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2} lg={3}>
              <TextField
                label="Start Year"
                value={edu.startYear}
                onChange={(e) =>
                  handleEducationChange(index, "startYear", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2} lg={3}>
              <TextField
                label="End Year"
                value={edu.endYear}
                onChange={(e) =>
                  handleEducationChange(index, "endYear", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Percentage"
                value={edu.percentage}
                onChange={(e) =>
                  handleEducationChange(index, "percentage", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="CGPA"
                value={edu.cgpa}
                onChange={(e) =>
                  handleEducationChange(index, "cgpa", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="City"
                value={edu.city}
                onChange={(e) =>
                  handleEducationChange(index, "city", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Branch"
                value={edu.branch}
                onChange={(e) =>
                  handleEducationChange(index, "branch", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="outlined" onClick={() => handleAddToArray("education")}>
        + Add Education
      </Button>

      {/* Experience Section */}
      {/* <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Experience
      </Typography>
      {experience.map((exp, index) => (
        <Box key={index} sx={{ mb: 2, mt: 3 }}>
          <Typography sx={{ mt: 6 }}>
            Experience Details {index + 1}
            <IconButton
              size="small"
              onClick={() => handleRemoveFromArray(index, "experience")}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={6}>
              <TextField
                label="Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2} lg={3}>
              <TextField
                label="Start Date"
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2} lg={3}>
              <TextField
                label="End Date"
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={6}>
              <TextField
                label="Role"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                fullWidth
                size="small"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="outlined" onClick={() => handleAddToArray("experience")}>
        + Add Experience
      </Button> */}

      {/* Experience Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 4 }}>
        Experience
      </Typography>
      {experience.map((exp, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography sx={{ mt: 4, mb: 1 }}>
            Experience {index + 1}
            <IconButton
              size="small"
              onClick={() => handleRemoveFromArray(index, "experience")}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Start Date"
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="End Date"
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                label="Role"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                label="Description"
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={() => handleAddToArray("experience")}
        sx={{ display: "block" }}
      >
        + Add Experience
      </Button>

      {/* Projects Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Projects
      </Typography>
      {projects.map((proj, index) => (
        <Box key={index} sx={{ mb: 2, mt: 3 }}>
          <Typography sx={{ mt: 6, mb: 1 }}>
            Project Details {index + 1}
            <IconButton
              size="small"
              onClick={() => handleRemoveFromArray(index, "projects")}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Project Title"
                value={proj.projectTitle}
                onChange={(e) =>
                  handleProjectChange(index, "projectTitle", e.target.value)
                }
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Description"
                value={proj.projectDescription}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "projectDescription",
                    e.target.value
                  )
                }
                fullWidth
                size="small"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={() => handleAddToArray("projects")}
        sx={{ display: "block" }}
      >
        + Add Project
      </Button>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "linear-gradient(45deg, #ff6b6b, #f06595)",
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              background: "linear-gradient(45deg, #f06595, #ff6b6b)",
            },
            mt : 3,
            mb : 3,
          }}
        >
          Update Data
        </Button>
      </Box>
    </Box>
  );
};

export default AddResumeData;

// import { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Grid,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useResumeData } from "../hooks/useResumeData";
// import SimpleBackDrop from "../components/SimpleBackDrop";
// // import { stringyfyData as data} from "../../public/userData";

// // const userD = localStorage.getItem('user1');
// // const data1 = JSON.parse(userD);
// // const email =data1?.email;
// // console.log("this is the " , email);
// // const data = []
// // const data = JSON.parse(stringyfyData);
// // console.log(data);
// const AddResumeData = () => {
//   const {resumeData , isFetching} = useResumeData("siddeshs@gmail.com");
// //   console.log(resumeData?.data?.user?.data[0]);

// //   const JsonData = JSON.parse(resumeData || []);
//   const data = resumeData?.data?.user?.data[0] || {};
// //   console.log(data.education);

//   const [userData, setUserData] = useState({
//     name: data.name || "",
//     DOB: data.DOB || "",
//     email: data.email || "",
//     contactNo: data.contactNo || "",
//     website: data.website || "",
//     linkedIn: data.linkedIn || "",
//     role: data.role || "",
//     address: data.address || "",
//     profileSummary: data.profileSummary || "",
//     skills: data.skills || [],
//     languages: data.languages || [],
//     interests: data.interests || [],
//     education: data.education || [],
//     experience: data.experience || [],
//     projects: data.projects || [],
//   });

//   useEffect(() => {
//     if (!isFetching && resumeData) {
//       const data = resumeData.data?.user?.data[0] || {};
//       setExperience(data.experience);
//       setEducation(data.education);
//       setProjects(data.projects);
//       setUserData({
//         name: data.name || "",
//         DOB: data.DOB || "",
//         email: data.email || "",
//         contactNo: data.contactNo || "",
//         website: data.website || "",
//         linkedIn: data.linkedIn || "",
//         role: data.role || "",
//         address: data.address || "",
//         profileSummary: data.profileSummary || "",
//         skills: data.skills || [],
//         languages: data.languages || [],
//         interests: data.interests || [],
//         education: data.education || [],
//         experience: data.experience || [],
//         projects: data.projects || [],

//       });
//     }
//   }, [resumeData, isFetching]);

//   const [education, setEducation] = useState(data.education || []);
//   console.log('education',education);
// //   {
// //     institute: "",
// //     startYear: "",
// //     endYear: "",
// //     percentage: "",
// //     branch: "",
// //     cgpa: "",
// //     city: "",
// //   },
//   const [experience, setExperience] = useState(data.experience || []);

// //   { company: "", startDate: "", endDate: "", role: "", description: "" }
//   const [projects, setProjects] = useState(data.projects || []);

// //   { projectTitle: "", projectDescription: "" },

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleArrayChange = (index, value, type) => {
//     const updatedArray = [...userData[type]];
//     updatedArray[index] = value;
//     setUserData({ ...userData, [type]: updatedArray });
//   };

//   const handleAddToArray = (type) => {
//     if (type === "skills" || type === "languages" || type === "interests") {
//       setUserData({ ...userData, [type]: [...userData[type], ""] });
//     } else if (type === "education") {
//       setEducation([
//         ...education,
//         {
//           institute: "",
//           startYear: "",
//           endYear: "",
//           percentage: "",
//           branch: "",
//         },
//       ]);
//     } else if (type === "experience") {
//       setExperience([
//         ...experience,
//         { company: "", startDate: "", endDate: "", role: "", description: "" },
//       ]);
//     } else if (type === "projects") {
//       setProjects([...projects, { projectTitle: "", projectDescription: "" }]);
//     }
//   };

//   const handleEducationChange = (index, field, value) => {
//     const updatedEdu = [...education];
//     updatedEdu[index][field] = value;
//     setEducation(updatedEdu);
//   };

//   const handleExperienceChange = (index, field, value) => {
//     const updatedExp = [...experience];
//     updatedExp[index][field] = value;
//     setExperience(updatedExp);
//   };

//   const handleProjectChange = (index, field, value) => {
//     const updatedProjects = [...projects];
//     updatedProjects[index][field] = value;
//     setProjects(updatedProjects);
//   };

//   const handleRemoveFromArray = (index, type) => {
//     if (type === "skills" || type === "languages" || type === "interests") {
//       const updatedArray = [...userData[type]];
//       updatedArray.splice(index, 1);
//       setUserData({ ...userData, [type]: updatedArray });
//     } else if (type === "education") {
//       const updatedEdu = [...education];
//       updatedEdu.splice(index, 1);
//       setEducation(updatedEdu);
//     } else if (type === "experience") {
//       const updatedExp = [...experience];
//       updatedExp.splice(index, 1);
//       setExperience(updatedExp);
//     } else if (type === "projects") {
//       const updatedProjects = [...projects];
//       updatedProjects.splice(index, 1);
//       setProjects(updatedProjects);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const finalData = {
//       ...userData,
//       education,
//       experience,
//       projects,
//     };
//     console.log(finalData);
//     console.log(JSON.stringify(finalData));
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ maxWidth: "100%", mx: "auto", mt: 2, px: 2 }}
//     >
//       <SimpleBackDrop loading={isFetching}/>
//       <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
//         User Data Form
//       </Typography>
//       <Typography variant="h5" sx={{ display: "block", my: 2 }}>
//         Personal Data
//       </Typography>
//       <Grid container spacing={2}>
//         {[
//           "name",
//           "DOB",
//           "email",
//           "contactNo",
//           "role",
//           "address",
//           "linkedIn",
//           "website",
//         ].map((field) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={field}>
//             <TextField
//               label={field.charAt(0).toUpperCase() + field.slice(1)}
//               name={field}
//               fullWidth
//               size="small"
//               defaultValue={userData[field]}
//               onChange={handleChange}
//             />
//           </Grid>
//         ))}
//         <Grid item xs={12}>
//           <Typography variant="h5" sx={{ mt: 3, mb: 3 }}>
//             Profile Summary
//           </Typography>
//           <TextField
//             label="Profile Summary"
//             name="profileSummary"
//             fullWidth
//             size="small"
//             defaultValue={userData.profileSummary}
//             onChange={handleChange}
//             multiline
//             rows={2}
//           />
//         </Grid>
//       </Grid>

//       <Grid item xs={6} sm={4} md={3}>
//         {["skills", "languages", "interests"].map((type) => (
//           <div key={type}>
//             <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </Typography>
//             {userData[type].map((item, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <TextField
//                   label={`${
//                     type.slice(0, -1).charAt(0).toUpperCase() +
//                     type.slice(0, -1).slice(1)
//                   } ${index + 1}`}
//                   value={item}
//                   onChange={(e) =>
//                     handleArrayChange(index, e.target.value, type)
//                   }
//                   size="small"
//                   sx={{ mr: 1, maxWidth: "330px" }}
//                 />
//                 <IconButton
//                   size="small"
//                   onClick={() => handleRemoveFromArray(index, type)}
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//               </div>
//             ))}
//             <Button
//               variant="outlined"
//               onClick={() => handleAddToArray(type)}
//               sx={{ mt: 1 }}
//             >
//               + Add {type.slice(0, -1)}
//             </Button>
//           </div>
//         ))}
//       </Grid>

//       {/* Education Section */}
//       <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
//         Education
//       </Typography>
//       {education.map((edu, index) => (
//         <Box key={index} sx={{ mb: 2, mt: 3 }}>
//           <Typography sx={{ mt: 6 }}>
//             Education Details {index + 1}
//             <IconButton
//               size="small"
//               onClick={() => handleRemoveFromArray(index, "education")}
//               sx={{ ml: 1 }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={8} lg={6}>
//               <TextField
//                 label="Institute"
//                 value={edu.institute}
//                 onChange={(e) =>
//                   handleEducationChange(index, "institute", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={2} lg={3}>
//               <TextField
//                 label="Start Year"
//                 value={edu.startYear}
//                 onChange={(e) =>
//                   handleEducationChange(index, "startYear", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={2} lg={3}>
//               <TextField
//                 label="End Year"
//                 value={edu.endYear}
//                 onChange={(e) =>
//                   handleEducationChange(index, "endYear", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={3}>
//               <TextField
//                 label="Percentage"
//                 value={edu.percentage}
//                 onChange={(e) =>
//                   handleEducationChange(index, "percentage", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={3}>
//               <TextField
//                 label="CGPA"
//                 value={edu.cgpa}
//                 onChange={(e) =>
//                   handleEducationChange(index, "cgpa", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={3}>
//               <TextField
//                 label="City"
//                 value={edu.city}
//                 onChange={(e) =>
//                   handleEducationChange(index, "city", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={3}>
//               <TextField
//                 label="Branch"
//                 value={edu.branch}
//                 onChange={(e) =>
//                   handleEducationChange(index, "branch", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       ))}
//       <Button variant="outlined" onClick={() => handleAddToArray("education")}>
//         + Add Education
//       </Button>

//       {/* Experience Section */}
//       <Typography variant="h5" sx={{ mt: 4, mb: 4 }}>
//         Experience
//       </Typography>
//       {experience.map((exp, index) => (
//         <Box key={index} sx={{ mb: 2 }}>
//           <Typography sx={{ mt: 4 }}>
//             Experience {index + 1}
//             <IconButton
//               size="small"
//               onClick={() => handleRemoveFromArray(index, "experience")}
//               sx={{ ml: 1 }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Company"
//                 value={exp.company}
//                 onChange={(e) =>
//                   handleExperienceChange(index, "company", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={3}>
//               <TextField
//                 label="Start Date"
//                 value={exp.startDate}
//                 onChange={(e) =>
//                   handleExperienceChange(index, "startDate", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={3}>
//               <TextField
//                 label="End Date"
//                 value={exp.endDate}
//                 onChange={(e) =>
//                   handleExperienceChange(index, "endDate", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={4}>
//               <TextField
//                 label="Role"
//                 value={exp.role}
//                 onChange={(e) =>
//                   handleExperienceChange(index, "role", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={6} md={8}>
//               <TextField
//                 label="Description"
//                 value={exp.description}
//                 onChange={(e) =>
//                   handleExperienceChange(index, "description", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       ))}
//       <Button
//         variant="outlined"
//         onClick={() => handleAddToArray("experience")}
//         sx={{ display: "block" }}
//       >
//         + Add Experience
//       </Button>

//       {/* Projects Section */}
//       <Typography variant="h5" sx={{ mt: 4, mb: 4 }}>
//         Projects
//       </Typography>
//       {projects.map((proj, index) => (
//         <Box key={index} sx={{ mb: 2 }}>
//           <Typography sx={{ mt: 4 , mb : 2}}>
//             Project {index + 1}
//             <IconButton
//               size="small"
//               onClick={() => handleRemoveFromArray(index, "projects")}
//               sx={{ ml: 1 }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Project Title"
//                 value={proj.projectTitle}
//                 onChange={(e) =>
//                   handleProjectChange(index, "projectTitle", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Project Description"
//                 value={proj.projectDescription}
//                 onChange={(e) =>
//                   handleProjectChange(index, "projectDescription", e.target.value)
//                 }
//                 fullWidth
//                 size="small"
//                 multiline
//                 rows={2}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       ))}
//       <Button
//         variant="outlined"
//         onClick={() => handleAddToArray("projects")}
//       >
//         + Add Project
//       </Button>

//       <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//         <Button type="submit" variant="contained" sx={{ mt: 3, mx: "auto" }}>
//           Submit
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AddResumeData;
