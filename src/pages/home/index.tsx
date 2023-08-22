import { Box, Grid } from "@mui/material";
import Navbar from "../../layout/MinimalLayout/AppBar";
import Hero from "../../layout/MinimalLayout/Hero";
import Footer from "../../layout/MinimalLayout/Footer";
import Guide from "../../layout/MinimalLayout/Guide";
import About from "../../layout/MinimalLayout/About";
import AuthFooter from "../../components/cards/AuthFooter";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Guide />
      <About />
      <Footer />
      <Box
        sx={{
          backgroundColor: "#f4f6f8",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{ py: 2, mx: 3, borderTop: 1, borderColor: "#d4d4d4" }}
        >
          <AuthFooter />
        </Grid>
      </Box>
    </>
  );
};

export default Home;
