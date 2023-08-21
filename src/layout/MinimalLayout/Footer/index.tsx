import { styled, Typography, Theme } from "@mui/material";
import { Box, Container } from "@mui/system";
import fbIcon from "../../../assets/images/fbicon.png";
import twitterIcon from "../../../assets/images/twittericon.png";
import linkedinIcon from "../../../assets/images/linkedinicon.png";

const Footer: React.FC = () => {
  const CustomContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }: { theme: Theme }) => ({
    fontSize: "16px",
    // color: "#7A7A7E",
    color: "#fff",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));

  return (
    <Box sx={{ py: 10, backgroundColor: "#33334d" }}>
      <CustomContainer>
        <CustomContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                // color: "#1C1C1D",
                color: "#fff",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Products
            </Typography>

            <FooterLink>Listing</FooterLink>
            <br />
            <FooterLink>Properties</FooterLink>
            <br />
            <FooterLink>Agents</FooterLink>
            <br />
            <FooterLink>Blog</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                // color: "#1C1C1D",
                color: "#fff",

                fontWeight: "700",
                mb: 2,
              }}
            >
              Resources
            </Typography>

            <FooterLink>Our Homes</FooterLink>
            <br />
            <FooterLink>Stories</FooterLink>
            <br />
            <FooterLink>Video</FooterLink>
            <br />
            <FooterLink>Free Trial</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                // color: "#1C1C1D",
                color: "#fff",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Company
            </Typography>

            <FooterLink>Partnerships</FooterLink>
            <br />
            <FooterLink>Terms of use</FooterLink>
            <br />
            <FooterLink>Privacy</FooterLink>
            <br />
            <FooterLink>Sitemap</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                // color: "#1C1C1D",
                fontWeight: "700",
                color: "#fff",
                mb: 2,
              }}
            >
              Get in touch
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                // color: "#7A7A7E",
                color:'#fff',
                fontWeight: "500",
                mb: 2,
              }}
            >
              You’ll find your next home, in any style you prefer.
            </Typography>

            <IconBox>
              <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
              <img
                src={twitterIcon}
                alt="twitterIcon"
                style={{ cursor: "pointer" }}
              />
              <img
                src={linkedinIcon}
                alt="linkedinIcon"
                style={{ cursor: "pointer" }}
              />
            </IconBox>
          </Box>
        </CustomContainer>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
