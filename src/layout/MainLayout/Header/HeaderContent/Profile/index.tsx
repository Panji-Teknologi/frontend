import { useRef, useState, ReactNode, useEffect } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

// project import
import MainCard from "../../../../../components/MainCard";
import Transitions from "../../../../../components/@extended/Transitions";
import ProfileTab from "./ProfileTab";
import { useAppDispatch, useAppSelector } from "../../../../../store";

// assets
import {
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { clearProfiles } from "../../../../../store/reducers/profile";

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme<any>();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { profiles } = useAppSelector((state: any) => state.profile);

  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    // logout
    signOut();
    dispatch(clearProfiles(null));
    navigate("/login");
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <UserOutlined />
          <Typography variant="subtitle1"> {profiles?.name}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            <UserOutlined
                              style={{ fontSize: 35, color: "#08c" }}
                            />
                            <Stack>
                              <Typography variant="h6">
                                {profiles?.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {profiles?.job}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size="large"
                            color="secondary"
                            onClick={handleLogout}
                          >
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <ProfileTab handleLogout={handleLogout} />
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
