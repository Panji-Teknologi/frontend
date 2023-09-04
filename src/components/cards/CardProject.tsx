// material-ui
import {
  Button,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Avatar
} from '@mui/material';

// project import
import MainCard from '../MainCard';

// assets
import { EnvironmentOutlined, LinkOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

// types
import { ProjectType } from '../../types';

// ==============================|| CUSTOMER - CARD ||============================== //

interface CardProjectProps {
  project: ProjectType
}

const CardProject = ({ project }: CardProjectProps) => {
  return (
    <>
      <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
        <Grid id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
              >
                <ListItemAvatar>
                  <Avatar alt={'Jajang Jamidun'} src={''} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">{project.contract_number}</Typography>}
                  secondary={
                    <Typography variant="caption" color="secondary">
                      {project.client_company_name}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography>Hello, namasaya jajang</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem>
                    <ListItemIcon>
                      <MailOutlined />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">jajang@email.com</Typography>} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="secondary">
                          +1 (###) ###-####
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem>
                    <ListItemIcon>
                      <EnvironmentOutlined />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">endonesah</Typography>} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LinkOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link href="https://google.com" target="_blank" sx={{ textTransform: 'lowercase' }}>
                          https://jajang.en
                        </Link>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          className="hideforPDf"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
        >
          <Typography variant="subtitle2" color="secondary">
            {project.name}
          </Typography>
          <Button variant="outlined" size="small">
            Preview Project
          </Button>
        </Stack>
      </MainCard>
    </>
  );
};

export default CardProject;
