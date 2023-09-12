import { useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Chip,
  Drawer,
  InputAdornment,
  Button,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

// project imports
import UserList from './UserList';
import MainCard from '../../components/MainCard';
import SimpleBar from '../../components/third-party/SimpleBar';

// assets
import {
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';

// ==============================|| CHAT DRAWER ||============================== //

interface ChatDrawerProps {
  handleDrawerOpen: () => void;
  openChatDrawer: boolean;
  setUser: (user: any) => void;
};

function ChatDrawer({ handleDrawerOpen, openChatDrawer, setUser }: ChatDrawerProps) {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));


  const [search, setSearch] = useState<string>('');
  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const newString = event?.target.value;
    setSearch(newString);
  };

  return (
    <Drawer
      sx={{
        width: 320,
        flexShrink: 0,
        zIndex: { xs: 1100, lg: 0 },
        '& .MuiDrawer-paper': {
          height: matchDownLG ? '100%' : 'auto',
          width: 320,
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none'
        }
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openChatDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard
        sx={{
          borderRadius: '4px 0 0 4px',
          borderRight: 'none'
        }}
        border={!matchDownLG}
        content={false}
      >
        <Box sx={{ p: 3, pb: 1 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="h5" color="inherit">
                Messages
              </Typography>
              <Chip
                label="1"
                component="span"
                color="secondary"
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  '& .MuiChip-label': {
                    px: 0.5
                  }
                }}
              />
            </Stack>

            <OutlinedInput
              fullWidth
              id="input-search-header"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              sx={{
                '& .MuiOutlinedInput-input': {
                  p: '10.5px 0px 12px'
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined style={{ fontSize: 'small' }} />
                </InputAdornment>
              }
            />
          </Stack>
        </Box>

        <SimpleBar
          sx={{
            overflowX: 'hidden',
            height: matchDownLG ? 'calc(100vh - 120px)' : 'calc(100vh - 428px)',
            minHeight: matchDownLG ? 0 : 420
          }}
        >
          <Box sx={{ p: 3, pt: 0 }}>
            <UserList setUser={setUser} search={search} />
          </Box>
        </SimpleBar>

        <Box sx={{ p: 2 }}>
          <Button fullWidth color='primary' variant='contained' startIcon={<PlusOutlined />}>
            New Message
          </Button>
        </Box>
      </MainCard>
    </Drawer>
  );
}

export default ChatDrawer;
