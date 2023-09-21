import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Avatar,
  useMediaQuery
} from '@mui/material';

// project import
import MainCard from '../MainCard';


// types
import { ProjectType } from '../../types';
import idrFormat from '../../utils/idrFormat';

// ==============================|| CUSTOMER - CARD ||============================== //

interface CardProjectProps {
  project: ProjectType
}

const CardProject = ({ project }: CardProjectProps) => {
  const navigate = useNavigate()
  const matchDownSM = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const handleToProjectDetail = () => {
    navigate(`/project/${project.associate_id}/${project.contract_number}`);
  }

  return (
    <>
      <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
        <Grid id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <Stack
              direction={matchDownSM ? 'column' : 'row'}
              sx={{ width: '100%' }}
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
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
              <Typography variant='body1' color='grey'><b>{idrFormat(project.total_price_contract)}</b></Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
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
          <Button variant="outlined" size="small" onClick={handleToProjectDetail}>
            Preview Project
          </Button>
        </Stack>
      </MainCard>
    </>
  );
};

export default CardProject;
