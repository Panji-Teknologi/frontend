import { Outlet, useLocation } from "react-router-dom";

// material-ui
import { Box } from "@mui/material";
import Home from "../../pages/home";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ width: "100%", flexGrow: 1 }}>
        {pathname === "/" && <Home />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MinimalLayout;
