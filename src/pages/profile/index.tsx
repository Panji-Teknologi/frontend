// material ui
import {
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography,
  Avatar
} from '@mui/material'

// third party
import dayjs from 'dayjs';

// project import
import MainCard from '../../components/MainCard'
import PersonalInfo from './PersonalInfo';

import { useAppSelector } from '../../store';

// assets
import { CalendarOutlined } from '@ant-design/icons';

// ==============================|| PROFILE ||============================== //

const Profile = () => {
  const { profiles } = useAppSelector((state: any) => state.profile);

  return (
    <MainCard border={false} boxShadow>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} md={4} xl={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MainCard>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">
                      <Chip label="Associate" size="small" color="primary" />
                    </Stack>
                    <Stack spacing={2.5} alignItems="center">
                      <Avatar alt="Avatar 1" />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{profiles?.name}</Typography>
                        <Typography color="secondary">{profiles?.job}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarOutlined />
                          <Typography variant='caption' sx={{ ml: 1 }}>Verifivation Date</Typography>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">{dayjs(profiles?.tgl_diverifikasi).format("DD MMM YYYY")}</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={7} md={8} xl={9}>
          <PersonalInfo profile={profiles} />
        </Grid>
      </Grid>
    </MainCard>
  )
}

export default Profile