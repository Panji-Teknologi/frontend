//react
import { Link } from "react-scroll";

//material ui
import { styled, Typography, Theme } from "@mui/material";
import { Box, Container } from "@mui/system";

//import
import fbIcon from "../../../assets/images/fbicon.png";
import twitterIcon from "../../../assets/images/twittericon.png";
import linkedinIcon from "../../../assets/images/linkedinicon.png";
import logoImg from "../../../assets/images/logo.png";

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    // gap: theme.spacing(5),
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


  const FooterLink = styled("span")(() => ({
    fontSize: "16px",
    // color: "#7A7A7E",
    color: "#1C1C1D",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#ff6600",
    },
  }));

  const NavbarLogo = styled("img")(({ theme }: { theme: Theme }) => ({
    cursor: "pointer",
    height: 70,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <Box id="section5" sx={{ py: 10, backgroundColor: "#f4f6f8" }}>
      <CustomContainer>
        <Box>
          <NavbarLogo src={logoImg} alt="logo" />
          <Typography
            sx={{
              fontSize: "20px",
              // color: "#1C1C1D",
              color: "#1C1C1D",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Associate Management
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              // color: "#1C1C1D",
              color: "#1C1C1D",
              mb: 2,
              maxWidth: 600,
            }}
          >
            AD PREMIER, JL. TB Simatupang NO.5, RW.7, Ragunan, Kecamatan Pasar
            Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12550
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

        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              // color: "#1C1C1D",
              color: "#1C1C1D",

              fontWeight: "700",
              mb: 2,
            }}
          >
            Navigations
          </Typography>

            <Link to="section1" smooth={true} duration={500} style={{fontWeight:'500', fontSize:15, cursor: "pointer" }} >Home</Link><br/>
            <Link to="section2" smooth={true} duration={500} style={{fontWeight:'500', fontSize:15, cursor: "pointer" }} >About</Link><br/>
            <Link to="section3" smooth={true} duration={500} style={{fontWeight:'500', fontSize:15, cursor: "pointer" }} >Listed</Link><br/>
            <Link to="section4" smooth={true} duration={500} style={{fontWeight:'500', fontSize:15, cursor: "pointer" }} >Services</Link><br/>
            <Link to="section5" smooth={true} duration={500} style={{fontWeight:'500', fontSize:15, cursor: "pointer" }} >Contact</Link>
          
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              // color: "#1C1C1D",
              color: "#1C1C1D",
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
      </CustomContainer>
    </Box>
  );
};

export default Footer;
