import { useRef, useState } from 'react';

import {
  Badge,
  Box,
  IconButton,
} from '@mui/material';

// assets
import { BellOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={4} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Notification;
