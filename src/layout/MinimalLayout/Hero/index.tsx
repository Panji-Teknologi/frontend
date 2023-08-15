// // material-ui
// import { useTheme } from "@mui/material/styles";
// import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";

// import heroImg from "../../../assets/images/hero.svg";
// // import logo from "../../../assets/images/logo.png";
// import AnimateButton from "../../../components/@extended/AnimateButton";
// import DrawerAppBar from "../AppBar";
// // import Footer from "../Footer";

// // ==============================|| MINIMAL LAYOUT - HEADER ||============================== //

// const Hero = () => {
//   const theme = useTheme<any>();

//   return (
//     <div>
//       <DrawerAppBar />
//       <Box
//         sx={{
//           // display: "flex",
//           // justifyContent: "space-between",
//           // alignItems: "center",
//           height: "100vh",
//           // background: rgb(255,255,255);
//           background: `linear-gradient(321deg, rgba(255, 255, 255, 1) 68%, rgba(255,122,69,1) 100%)`,
//         }}
//       >
//         {/* <DrawerAppBar /> */}

//         <Container>
//           <Grid container spacing={10} p={2}>
//             <Grid item xs={12} sm={12} md={6} lg={6}>
//               {/* <img
//               src={logo}
//               alt="Hero Associate Mangement"
//               style={{ height: 30, marginBottom: 50 }}
//             /> */}
//               <Typography
//                 variant="h1"
//                 gutterBottom
//                 // color={theme.palette.primary.main}
//                 color={'#4c4c4c'}
//                 sx={{ fontSize: 48, fontWeight: "bolder" }}
//               >
//                 Integrated Associate Management Platform
//               </Typography>
//               <Typography
//                 variant="subtitle2"
//                 component="p"
//                 gutterBottom
//                 sx={{ fontSize: 16, color: theme.palette.text.secondary }}
//               >
//                 A powerful and user-friendly associate management app designed
//                 to streamline your workforce operations. It robust reporting and
//                 analytics tools empower you to make data-driven decisions and
//                 optimize your performance.
//               </Typography>
//               <Link href="/register">
//                 <AnimateButton>
//                   <Button variant="contained" color="primary" size="large">
//                     Get Started
//                   </Button>
//                 </AnimateButton>
//               </Link>
//             </Grid>
//             <Grid item xs={12} sm={12} md={6} lg={6}>
//               <img
//                 src={heroImg}
//                 alt="Hero Associate Mangement"
//                 style={{ width: "100%", height: "100%", objectFit: "contain" }}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//       {/* <Box>
//         <Footer />
//       </Box> */}
//     </div>
//   );
// };

// export default Hero;

import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import Navbar from "../AppBar";
import heroImg from "../../../assets/images/hero.svg";
import CustomButton from "../../../components/CustomButton/CustomButton";
import Footer from "../Footer";


const Hero: React.FC = () => {
  
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    paddingBottom: theme.spacing(6),
    marginTop: theme.spacing(3),
    
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "50px",
    color: "#33334d",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("lg")]: {
      fontSize: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  }));

  return (
    <>
      <Box sx={{ backgroundColor: "#fff", minHeight: "80vh" }}>
        <Container>
          <Navbar />
          <CustomBox>
            <Box sx={{ flex: "1" }}>
              <Title variant="h1" sx={{ mt: 10 }}>
                Integrated Associate Management Platform
              </Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                A powerful and user-friendly associate management app designed
                to streamline your workforce operations. It robust reporting and
                analytics tools empower you to make data-driven decisions and
                optimize your performance.
              </Typography>
              <CustomButton
                backgroundColor="#ff6600"
                color="#fff"
                buttonText="More About Us"
                heroBtn={true}
              />
            </Box>

            <Box sx={{ flex: "1.25" }}>
              <img
                src={heroImg}
                alt="heroImg"
                style={{ maxWidth: "100%", marginTop: "3rem" }}
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Hero;
