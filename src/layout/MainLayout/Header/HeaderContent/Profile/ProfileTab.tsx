import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LogoutOutlined, UserOutlined, } from '@ant-design/icons';
import { useAppSelector } from '../../../../../store';

interface ProfileTabProps {
  handleLogout: () => void
};

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }: ProfileTabProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { profiles } = useAppSelector((state: any) => state.profile);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      {profiles?.is_valid === 1 && <ListItemButton selected={selectedIndex === 1} onClick={() => {
        handleListItemClick(1)
        navigate('/profile');
      }}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>}
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};



export default ProfileTab;
