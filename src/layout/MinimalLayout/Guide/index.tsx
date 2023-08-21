import { styled, Typography, Theme, Container } from "@mui/material";
import { Box } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faCalendarCheck,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const Guide: React.FC = () => {
  const CustomBoxGuide = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "65%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    margin: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    width: 260,
    height: 300,
    padding: theme.spacing(5),
    borderRadius: 20,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: 230,
      height: 290,
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
      width: 220,
      height: 280,
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontWeight: "500",
    fontSize: "24px",
    color: "#3B3c45",
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  }));

  const Desc = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#3B3c45",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          // backgroundColor: "#f4f6f8",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            width: "5%",
            height: "5px",
            backgroundColor: "#33334d",
            margin: "0 auto",
          }}
        ></div>

        <Typography
          variant="h3"
          sx={{ fontSize: "35px", fontWeight: "bold", color: "#33334d", my: 3 }}
        >
          Work With Us
        </Typography>

        <CustomBoxGuide>
          <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#5A6473",
              textAlign: "center",
            }}
          >
            Associate Management Platform is robust reporting and analytics
            tools empower you to make data-driven decisions and optimize your
            performance. Everything you need to know when becoming an associate!
          </Typography>
        </CustomBoxGuide>
        <Container>
          <GuidesBox>
            <GuideBox>
              <FontAwesomeIcon
                icon={faMessage}
                size="5x"
                style={{ color: "#343a40" }}
              />
              <Title
                variant="body1"
                sx={{
                  my: 1,
                  marginTop: 3,
                  fontWeight: "700",
                }}
              >
                Feedback
              </Title>
              <Desc variant="body1" sx={{ textAlign: "center" }}>
                Feedback helps associates understand how they are perceived by
                others and helps them improve their performance.
              </Desc>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
            </GuideBox>

            <GuideBox>
              <FontAwesomeIcon
                style={{ color: "#343a40" }}
                icon={faCalendarCheck}
                size="5x"
              />
              <Title
                variant="body2"
                sx={{
                  my: 1,
                  marginTop: 3,
                  fontWeight: "700",
                }}
              >
                Execution
              </Title>
              <Desc variant="body1" sx={{ textAlign: "center" }}>
                Discipline to Complete a Task Thoroughly.
              </Desc>

              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
            </GuideBox>

            <GuideBox>
              <FontAwesomeIcon
                style={{ color: "#343a40" }}
                icon={faPeopleGroup}
                size="5x"
              />
              <Title
                variant="body2"
                sx={{
                  my: 1,
                  marginTop: 3,
                  fontWeight: "700",
                }}
              >
                {" "}
                Support
              </Title>
              <Desc variant="body1" sx={{ textAlign: "center" }}>
                with the existence of this platform is expected to support
                associates in reporting
              </Desc>

              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
            </GuideBox>
          </GuidesBox>
        </Container>
      </Box>
    </>
  );
};

export default Guide;
