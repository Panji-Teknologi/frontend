import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Slide, Toolbar, useMediaQuery, Link } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from '../../menu-items';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';

// types
import { openDrawer } from '../../store/reducers/menu';
import Bottommenu from './BottomMenu';
import MainCard from '../../components/MainCard';
import { WhatsAppOutlined } from '@ant-design/icons';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const dispatch = useDispatch();
  const theme = useTheme<any>();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownXS = useMediaQuery(theme.breakpoints.down(512));

  const { drawerOpen } = useSelector((state: any) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      {!matchDownXS && <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />}
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <Slide direction='right' in={true} mountOnEnter unmountOnExit>
          <MainCard
            sx={{
              width: { xs: '100%', sm: 'auto' },
              position: 'fixed',
              zIndex: 9,
              right: { xs: 0, sm: 16 },
              bottom: { xs: 0, sm: '25%' },
              borderRadius: 50,
              p: 1
            }}
            content={false}
            shadow={theme.customShadows.z1}
            boxShadow
            border={false}
          >
            <IconButton LinkComponent={Link} href='https://wa.me/6281218227597?text=Halo' target='_blank'>
              <WhatsAppOutlined style={{ color: 'green', fontSize: 30 }} />
            </IconButton>
          </MainCard>
        </Slide>
        <Outlet />
      </Box>
      {matchDownXS && <Bottommenu />}
    </Box>
  );
};

export default MainLayout;
