import {
  Badge,
  Box,
  Tab,
  Tabs,
  Typography,
  styled,
  Paper,
} from "@mui/material";
import { Container } from "@mui/system";
import heroImg from "../../../assets/images/hero2.svg";
import { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const About: React.FC = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    paddingBottom: theme.spacing(5),

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "30px",
    color: "#33334d",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("lg")]: {
      fontSize: "26px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  }));

  const Desc = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#5A6473",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  }));

  const TitlePaper = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    color: "#5A6473",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  }));

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <Container>
          <CustomBox>
            <Box sx={{ flex: "1.2" }}>
              <Title variant="h3" sx={{ mt: 10 }}>
                We believe in Long Term Partnership.
              </Title>
              <Desc variant="body2" sx={{ my: 4 }}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit primis
                rutrum, nullam tempor malesuada laoreet tempus blandit pretium
                etc.
              </Desc>

              <Tabs value={tabValue} onChange={handleTabChange} role="tablist">
                <Tab
                  label={
                    <Box sx={{ display: "flex", backgroundColor: "" }}>
                      <Badge
                        badgeContent={1}
                        color="primary"
                        sx={{ marginTop: 1.5, mx: 2 }}
                      ></Badge>
                      <TitlePaper variant="body2">Experience</TitlePaper>
                    </Box>
                  }
                  value={0}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex" }}>
                      <Badge
                        badgeContent={2}
                        color="primary"
                        sx={{ marginTop: 1.5, mx: 2 }}
                      ></Badge>
                      <TitlePaper variant="body2">Flexibility</TitlePaper>
                    </Box>
                  }
                  value={1}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex" }}>
                      <Badge
                        badgeContent={3}
                        color="primary"
                        sx={{ marginTop: 1.5, mx: 2 }}
                      ></Badge>
                      <TitlePaper variant="body2">Result</TitlePaper>
                    </Box>
                  }
                  value={2}
                />
              </Tabs>

              <Paper
                sx={{ padding: 3, borderTop: 0, width: "100%" }}
                elevation={3}
                className="tab-content border border-top-0 text-secondary p-30"
                id="myTabContent"
              >
                <TabPanel value={tabValue} index={0}>
                  <Desc
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    primis rutrum, nullam tempor malesuada laoreet tempus
                    blandit pretium etc. Curabitur vehicula auctor ornare. Nulla
                    non ullamcorper tellus. Vestibulum pulvinar eros nec tortor
                    maximus, iaculis rutrum nibh mollis.
                  </Desc>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#ff6600",
                      }}
                    >
                      Learn More
                    </Typography>
                    <ArrowRightAltIcon style={{ color: "#ff6600" }} />
                  </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Desc
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                  >
                    Leverage agile frameworks to provide a robust synopsis for
                    high level overviews. Organically grow the holistic world
                    view of disruptive innovation via workplace diversity and
                    empowerment.
                  </Desc>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#ff6600",
                      }}
                    >
                      Learn More
                    </Typography>
                    <ArrowRightAltIcon style={{ color: "#ff6600" }} />
                  </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <Desc
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                  >
                    Capitalize on low hanging fruit to identify a ballpark value
                    added activity to beta test. Nanotechnology immersion along
                    the information highway will close the loop on focusing
                    solely on the bottom line.
                  </Desc>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#ff6600",
                      }}
                    >
                      Learn More
                    </Typography>
                    <ArrowRightAltIcon style={{ color: "#ff6600" }} />
                  </Box>
                </TabPanel>
              </Paper>
            </Box>

            <Box sx={{ flex: "1.15" }}>
              <img
                src={heroImg}
                alt="heroImg"
                style={{ maxWidth: "100%", marginTop: "2rem" }}
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
};

export default About;
