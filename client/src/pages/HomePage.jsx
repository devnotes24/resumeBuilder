import { Box, Button, Typography, Grid, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/useGlobalState';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '2rem',
    },
    image: {
        width: '100%',
        maxWidth: '600px',
        borderRadius: '8px',
        marginBottom: '2rem',
        [theme.breakpoints.up('md')]: {
            marginBottom: 0,
        },
    },
    description: {
        maxWidth: '800px',
        margin: '0 auto',
        fontSize: '1.1rem',
    },
    gridContainer: {
        [theme.breakpoints.up('md')]: {
            alignItems: 'center',
        },
    },
    gridItem: {
        [theme.breakpoints.up('md')]: {
            padding: '1rem',
        },
    },
}));

const ResumeBuilderPage = () => {
    const {isAuthenticated} = useGlobalState();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const classes = useStyles();
    const navigate = useNavigate();
    
    return (
        <Box sx={{ p: 3, minHeight: '80vh' ,ml : {xs : 0, sm : 4 , md : 6}}}>
            <Grid container spacing={6} margin={"auto"}>
                {/* Left Side (Resume Preview) */}
                <Grid item xs={12} md={5}>
                    <Box>
                        <img
                            src="https://photoaid.com/images/cms/e3d5eff72ba164feb9213068dea35f12_697fb43121.webp?quality=80&format=webp&width=1920"
                            alt="Calm Connect"
                            className={classes.image}
                        />
                    </Box>
                </Grid>

                {/* Right Side (Call to Action) */}
                <Grid item xs={12} md={7} sx={{mt : {xs : -14 , sm : -18 ,md : 3 , lg : 5 , xl : 7}}}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: isDarkMode ? '#fff' : "#000",
                            lineHeight: 1.2,
                            maxWidth: "500px",
                            mt: {xs : 0, sm : 2 , md : 3},
                            fontSize: { xs: "30px", sm: "34px", md: "38px" , lg: "42px" },
                        }}
                    >
                        The Best Online Resume Builder
                    </Typography>
                    <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                            color: '#555',
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            lineHeight: 1.6,
                            mt: 4
                        }}
                    >
                        Easily create the perfect resume for any job using our best-in-class resume builder platform.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: 'column', sm: 'row' }, mt: 5 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/resume')}
                            sx={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                background: 'linear-gradient(45deg, #ff6b6b, #f06595)',
                                color: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #f06595, #ff6b6b)',
                                }
                            }}
                        >
                            <Typography sx={{ fontWeight: 700 }}>Create My Resume Now</Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => !isAuthenticated && navigate('/signIn')}
                            sx={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                color: '#ff6b6b',
                                borderColor: '#ff6b6b',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #f06595, #ff6b6b)',
                                    color: '#fff',
                                }
                            }}
                        >
                            <Typography sx={{ fontWeight: 700 }}>Sign In</Typography>
                        </Button>
                    </Box>
                    <Box sx={{ mt: 4, display: "flex" , gap : {xs : 1, sm : 2, md : 3}}}>
                        <Box>
                            <Typography variant="h5" sx={{ color: '#6f42c1', fontWeight: 800 }}>
                                ↑ 38%
                            </Typography>
                            <Typography sx={{ color: '#6f42c1' }}>more interviews</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ color: '#6f42c1', fontWeight: 800 }}>
                                ↑ 23%
                            </Typography>
                            <Typography sx={{ color: '#6f42c1' }}>more likely to get a job offer</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ResumeBuilderPage;

















// import { Box, Button, Typography, Grid, useTheme } from '@mui/material';
// import {makeStyles} from '@mui/styles'
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         textAlign: 'center',
//         padding: '2rem',
//     },
//     image: {
//         width: '100%',
//         maxWidth: '600px',
//         borderRadius: '8px',
//         marginBottom: '2rem',
//         [theme.breakpoints.up('md')]: {
//             marginBottom: 0,
//         },
//     },
//     description: {
//         maxWidth: '800px',
//         margin: '0 auto',
//         fontSize: '1.1rem',
//     },
//     gridContainer: {
//         [theme.breakpoints.up('md')]: {
//             alignItems: 'center',
//         },
//     },
//     gridItem: {
//         [theme.breakpoints.up('md')]: {
//             padding: '1rem',
//         },
//     },
// }));

// const ResumeBuilderPage = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode==='dark';


//   const classes = useStyles();

//   return (
//     <Box sx={{ p: 3, minHeight: '100vh' }}>
//       {/* Main Content Grid */}
//       <Grid container spacing={6}>
//         {/* Left Side (Resume Preview) */}
//         <Grid item xs={12} md={5}>
//           {/* <Card sx={{ p: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//             <Avatar 
//               alt="Jessica Lang"
//               src="/avatar-image.jpg" // Use your image source here
//               sx={{ width: 120, height: 120, margin: 'auto', border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
//             />
//             <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
//               Jessica Lang
//             </Typography>
//             <Typography variant="subtitle1" textAlign="center" sx={{ color: '#666', mb: 2 }}>
//               Registered Nurse
//             </Typography>
//             <Typography sx={{ mt: 2, fontSize: '1rem', color: '#333', textAlign: 'justify' }}>
//               A Registered Nurse with three years of experience delivering high-quality healthcare services to diverse patient populations.
//               Adept at coordinating with nursing teams and medical personnel to drive improvements in healthcare outcomes.
//             </Typography>
//           </Card> */}
//           <Box>
//             <img 
//                 src="https://photoaid.com/images/cms/e3d5eff72ba164feb9213068dea35f12_697fb43121.webp?quality=80&format=webp&width=1920" 
//                 alt="Calm Connect" 
//                 className={classes.image} 
//                 />
//           </Box>
//         </Grid>

//         {/* Right Side (Call to Action) */}
//         <Grid item xs={12} md={7}>
//           <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : "#000", lineHeight: 1.2 , maxWidth : "500px" , mt : 3}}>
//             The Best Online Resume Builder
//           </Typography>
//           <Typography variant="body1" gutterBottom sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.6 , mt : 4}}>
//             Easily create the perfect resume for any job using our best-in-class resume builder platform.
//           </Typography>
//           <Box sx={{display : "flex" , gap : 3}}>
//           <Button 
//             variant="contained" 
//             size="large" 
//             sx={{
//               mr: 2, mt: 5, padding: '10px 20px', borderRadius: '8px', 
//               background: 'linear-gradient(45deg, #ff6b6b, #f06595)',
//               color: '#fff',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//               '&:hover': {
//                 background: 'linear-gradient(45deg, #f06595, #ff6b6b)',
//               }
//             }}
//           >
//             <Typography sx={{fontWeight : 700}}>Create My Resume Now</Typography>
//           </Button>
//           <Button 
//             variant="outlined" 
//             size="large" 
//             sx={{
//               mt: 5, padding: '10px 20px', borderRadius: '8px',
//               color: '#ff6b6b',
//               borderColor: '#ff6b6b',
//               '&:hover': {
//                 background: 'linear-gradient(45deg, #f06595, #ff6b6b)',
//                 color: '#fff',
//               }
//             }}
//           >
//             <Typography sx={{fontWeight : 700}}>Import Resume</Typography>
//           </Button>
//           </Box>
//           <Box sx={{ mt: 4 , display:"flex" , gap: 3}}>
//           <Box>
//             <Typography variant="h4" sx={{ color: '#6f42c1', fontWeight: 800 }}>
//               ↑ 38%
//             </Typography>
//             <Typography sx={{ color: '#6f42c1' }}>more interviews</Typography>
//           </Box>
//           <Box>
//             <Typography variant="h4" sx={{ color: '#6f42c1', fontWeight: 800 }}>
//               ↑ 23%
//             </Typography>   
//             <Typography sx={{ color: '#6f42c1' }}>more likely to get a job offer</Typography>
//           </Box>
//         </Box>
//         </Grid>


//       </Grid>
//     </Box>
//   );
// };

// export default ResumeBuilderPage;
