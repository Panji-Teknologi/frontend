import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material'

// assets
import { DashboardOutlined, AuditOutlined, UserOutlined } from '@ant-design/icons';

const Bottommenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const linkPath = pathname.split('/')[1];

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (linkPath === 'dashboard') {
      setValue(0)
    }
    if (linkPath === 'project') {
      setValue(1)
    }
    if (linkPath === 'profile') {
      setValue(2)
    }
  }, [pathname]);

  const handlenavigation = (event: any, value: number) => {
    event.preventDefault();

    setValue(value)

    // to dashboard page
    if (value === 0) {
      navigate('/dashboard')
    }

    // to history page
    if (value === 1) {
      navigate('/project')
    }

    // to profile page
    if (value === 2) {
      navigate('/profile')
    }
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handlenavigation}
      >
        {menus.map((menu, i) => (
          <BottomNavigationAction
            key={i}
            label={
              <Typography variant='subtitle2'>
                {menu.label}
              </Typography>
            }
            icon={menu.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default Bottommenu

const menus = [
  {
    label: 'Dashboard',
    icon: <DashboardOutlined style={{ fontSize: 18, marginBottom: 4 }} />
  },
  {
    label: 'Project',
    icon: <AuditOutlined style={{ fontSize: 18, marginBottom: 4 }} />
  },
  {
    label: 'Profile',
    icon: <UserOutlined style={{ fontSize: 18, marginBottom: 4 }} />
  }
]