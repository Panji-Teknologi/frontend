// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import Logo from '../../../components/Logo/Logo';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface HeaderProps {
  open: boolean
  handleDrawerToggle: () => void
};

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }: HeaderProps) => {
  const theme = useTheme<any>();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownXS = useMediaQuery(theme.breakpoints.down(512));

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';

  // common header
  const mainHeader = (
    <Toolbar>
      {matchDownXS ? <Logo /> : <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>}
      <HeaderContent />
    </Toolbar>
  );

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled
          theme={theme}
          open={open}
          position='fixed'
          color='inherit'
          elevation={0}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar
          position='fixed'
          color='inherit'
          elevation={0}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >{mainHeader}</AppBar>
      )}
    </>
  );
};


export default Header;
