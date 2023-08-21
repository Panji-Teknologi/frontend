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
      fontSize: "18px",
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
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Lorem ipsum dolor sit amet consectetur adipiscing elit primis
                rutrum, nullam tempor malesuada laoreet tempus blandit pretium
                etc.
              </Typography>

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                className="nav nav-tabs nav-fill"
                role="tablist"
              >
                <Tab
                  label={
                    <Box sx={{ display: "flex" }}>
                      <Badge
                        badgeContent={1}
                        color="primary"
                        sx={{ marginTop: 1.5, mx: 2 }}
                      ></Badge>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "16px", color: "#5A6473" }}
                      >
                        Experience
                      </Typography>
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
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "16px", color: "#5A6473" }}
                      >
                        Flexibility
                      </Typography>
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
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "16px", color: "#5A6473" }}
                      >
                        Result
                      </Typography>
                    </Box>
                  }
                  value={2}
                />
              </Tabs>

              <Paper
                sx={{ padding: 3, borderTop: 0 }}
                elevation={3}
                className="tab-content border border-top-0 text-secondary p-30"
                id="myTabContent"
              >
                <TabPanel value={tabValue} index={0}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    primis rutrum, nullam tempor malesuada laoreet tempus
                    blandit pretium etc. Curabitur vehicula auctor ornare. Nulla
                    non ullamcorper tellus. Vestibulum pulvinar eros nec tortor
                    maximus, iaculis rutrum nibh mollis.
                  </Typography>
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
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                  >
                    Leverage agile frameworks to provide a robust synopsis for
                    high level overviews. Organically grow the holistic world
                    view of disruptive innovation via workplace diversity and
                    empowerment.
                  </Typography>
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
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                  >
                    Capitalize on low hanging fruit to identify a ballpark value
                    added activity to beta test. Nanotechnology immersion along
                    the information highway will close the loop on focusing
                    solely on the bottom line.
                  </Typography>
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
