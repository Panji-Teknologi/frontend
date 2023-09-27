import { Box, Typography, styled, Link } from "@mui/material";
import { Container } from "@mui/system";
import heroImg from "../../../assets/images/hero.svg";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CheckOutlined } from "@ant-design/icons";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
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
      <Box id= "section1"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
          // background: `linear-gradient(321deg, rgba(244,246,248, 1) 68%, rgba(255,122,69,1) 100%)`,
        }}
      >
        <Container>
          <CustomBox>
            <Box sx={{ flex: "1" }}>
              <Title variant="h1">Associate Management Platform</Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                A powerful and user-friendly associate management app designed
                to streamline your workforce operations.
              </Typography>
              <Box sx={{ display: "flex" }}>
                <CheckOutlined
                  style={{ marginTop: 5, marginInline: 5, color: "#ff6600" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5A6473" }}
                >
                  {" "}
                  Manage Your Own Projects
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <CheckOutlined
                  style={{ marginTop: 5, marginInline: 5, color: "#ff6600" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5A6473" }}
                >
                  {" "}
                  Know Income and Ongoing Projects
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 5 }}>
                <CheckOutlined
                  style={{ marginTop: 5, marginInline: 5, color: "#ff6600" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5A6473" }}
                >
                  {" "}
                  Project Reminder by System
                </Typography>
              </Box>
              <Link href="/register">
                <CustomButton
                  backgroundColor="#ff6600"
                  color="#fff"
                  buttonText="Join Us Today!"
                  heroBtn={true}
                />
              </Link>
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
    </>
  );
};

export default Hero;
