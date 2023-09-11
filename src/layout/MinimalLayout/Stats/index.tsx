import { Container, Grid, Typography, Box, Link } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faSmile,
  faFileAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../../components/CustomButton/CustomButton";

const StatsSection = () => {
  return (
    // <div className="section bg-secondary text-light py-3 py-lg-5 px-2 px-lg-4" id="stats">
    <Box
      sx={{
        bgcolor: "#33334d",
        color: "text.disabled",
        py: 6,
      }}
    >
      <Container>
        <Box
          sx={{
            alignItems: "center",
            paddingBottom: 6,
          }}
        >
          <Typography sx={{ fontSize: 40, textAlign: "center" }}>
            Helping 10,000+ associates.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                py: 2,
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faClipboardCheck}
                size="4x"
                className="mr-3"
              />
              <Box sx={{ marginInlineStart: 1 }}>
                <Typography variant="h2" gutterBottom>
                  325
                </Typography>
                <Typography variant="h6">Projects Done</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", py: 2, justifyContent: "center" }}>
              <FontAwesomeIcon icon={faSmile} size="4x" className="mr-3" />
              <Box sx={{ marginInlineStart: 1 }}>
                <Typography variant="h2" gutterBottom>
                  145
                </Typography>
                <Typography variant="h6">Happy Clients</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", py: 2, justifyContent: "center" }}>
              <FontAwesomeIcon icon={faFileAlt} size="4x" className="mr-3" />
              <Box sx={{ marginInlineStart: 1 }}>
                <Typography variant="h2" gutterBottom>
                  464
                </Typography>
                <Typography variant="h6">Appreciations</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", py: 2, justifyContent: "center" }}>
              <FontAwesomeIcon icon={faClock} size="4x" className="mr-3" />

              <Box sx={{ marginInlineStart: 1 }}>
                <Typography variant="h2" gutterBottom>
                  8565
                </Typography>
                <Typography variant="h6">Support Hours</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          alignItems: "center",
          alignContent: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href="/register"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <CustomButton
            backgroundColor="white"
            color="#33334d"
            buttonText="Join our network"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default StatsSection;
