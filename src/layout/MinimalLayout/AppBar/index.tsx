import { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Container } from "@mui/system";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
} from "@mui/material";
import logoImg from "../../../assets/images/logo.png";
import CustomButton from "../../../components/CustomButton/CustomButton";

const DrawerAppBar: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState<{
    left: boolean;
  }>({
    left: false,
  });

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMobileMenu({ ...mobileMenu, [anchor]: open });
    };

  const list = (anchor: string) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "About", "Services", "Listed", "Contact"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <FeaturedPlayListIcon />}
                  {index === 2 && <MiscellaneousServicesIcon />}
                  {index === 3 && <ListAltIcon />}
                  {index === 4 && <ContactsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const NavLink = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "14px",
    color: "#33334d",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "orange",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }: { theme: Theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
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
    // <Box sx={{ display: "flex" }}>
    //   <CssBaseline />
    //   <AppBar component="nav" color="transparent" sx={{ boxShadow: "none" }}>
    //     <Toolbar>
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <NavbarLogo src={logoImg} alt="logo" />
        </Box>

        <NavbarLinksBox>
          <NavLink variant="body2">Home</NavLink>
          <NavLink variant="body2">About</NavLink>
          <NavLink variant="body2">Services</NavLink>
          <NavLink variant="body2">Listed</NavLink>
          <NavLink variant="body2">Contact</NavLink>
        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Link href="/login">
          <NavLink variant="body2">Login</NavLink>
        </Link>

        <Link href="/register">
          <CustomButton
            backgroundColor="#ff6600"
            color="#fff"
            buttonText="Sign Up"
          />
        </Link>
      </Box>
    </NavbarContainer>
    //     </Toolbar>
    //   </AppBar>

    //   <Box component="main">
    //     <Toolbar />
    //   </Box>
    // </Box>
  );
};

export default DrawerAppBar;
