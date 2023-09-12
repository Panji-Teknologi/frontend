import { useEffect } from "react";
import { useParams } from "react-router-dom";

// material ui
import { Grid, Stack, Typography, List, ListItem, ListItemIcon, ListItemSecondaryAction, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

// project import
import { getProjectDetail } from "../../store/actions/project";
import { useAppDispatch, useAppSelector } from "../../store";
import { ProjectDetail } from "../../types";

import MainCard from "../../components/MainCard"
import useCookie from "../../hooks/useCookie";
import ButtonBack from "../../components/@extended/ButtonBack";

// assets
import { AuditOutlined } from '@ant-design/icons';
import idrFormat from "../../utils/idrFormat";
import dayjs from "dayjs";

const ProjectDetail = () => {
  const theme = useTheme<any>();
  const { userId, contract } = useParams();
  const matchDownMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { projectDetail } = useAppSelector((state: any) => state.project);
  const [token] = useCookie('_auth');

  useEffect(() => {
    if (userId !== undefined && contract !== undefined) {
      dispatch(getProjectDetail({ token, tokenUserId: Number(userId), contract }));
    }
  }, [userId, contract]);

  return (
    <>
      <Stack mb={2} direction='row' justifyContent='space-between'>
        <ButtonBack />
        <Typography variant="h5">Project Detail</Typography>
      </Stack>
      {projectDetail?.map((project: ProjectDetail, i: number) => (
        <MainCard key={i} sx={{ mb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={4} xl={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={2.5} alignItems="center">
                          <AuditOutlined style={{ fontSize: 30, color: '#555' }} />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h4" color={theme.palette.secondary['600']}>{project.contract_number}</Typography>
                            <Typography variant="subtitle1" color="primary">{idrFormat(project.total_price)}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                          <ListItem>
                            <ListItemIcon>
                              Exp Date
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{dayjs(project.expired_date).format('DD MMM YYYY')}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              Step
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              {/* <Typography align="right">{dayjs(project.cycle_date).format('DD MMM YYYY')}</Typography> */}
                              <Typography align="right">
                                {project.project_step_id === 1
                                  ? "Initial Audit"
                                  : project.project_step_id === 2
                                  ? "Surveillance 1"
                                  : project.project_step_id === 3
                                  ? "Surveillance 2"
                                  : project.project_step_id === 4
                                  ? "Surveillance 3"
                                  : project.project_step_id === 5
                                  ? "Surveillance 4"
                                  : project.project_step_id === 6
                                  ? "Surveillance 5"
                                  : null}
                              </Typography>
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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard title="Data Standards">
                    <List sx={{ py: 0 }}>
                      {project.data_standard?.map((standard, i) => (
                        <ListItem key={i} divider={!matchDownMD}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Type of Certification</Typography>
                                <Typography>
                                  {standard.type_of_certification_number}
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Price</Typography>
                                <Typography>{idrFormat(standard.price)}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                      ))}
                    </List>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      ))}
    </>
  )
}

export default ProjectDetail