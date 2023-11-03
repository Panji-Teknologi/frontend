import { useEffect, useState } from 'react';

// maerial-ui
import { Box, Typography, OutlinedInput, Grid, Slide } from "@mui/material"

// project import
import { useAppDispatch, useAppSelector } from '../store';
import { getProjectByAssociate } from '../store/actions/project';
import { getUserIdFromToken } from '../utils/decode-token';
import useCookie from '../hooks/useCookie';

// assets
import { SearchOutlined } from '@ant-design/icons';
import CardProject from '../components/cards/CardProject';
import EmptyUserCard from '../components/cards/EmptyUserCard';
import { ProjectType } from '../types';

// ==============================|| HISTTORY ||============================== //

const Project = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state: any) => state.project);

  const [token] = useCookie('_auth');
  const tokenUserId = getUserIdFromToken(token);

  // State
  const [search, setSeacrh] = useState<string>('');

  useEffect(() => {
    dispatch(getProjectByAssociate({ token, tokenUserId }))
  }, []);

  const handleChangeSearch = (value: string) => {
    console.log("Seacrh Value : ", value)
  }

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <Typography variant="h5">Project</Typography>

      <Box mt={4}>
        <OutlinedInput
          value={search || ''}
          onChange={(e) => {
            setSeacrh(e.target.value);
            handleChangeSearch(e.target.value);
          }}
          placeholder={`Search project(s)...`}
          size='small'
          startAdornment={<SearchOutlined />}
        />
      </Box>

      <Grid container spacing={3} mt={0}>
        {projects.length > 0 ? projects.map((project: ProjectType, i: number) => (
          <Slide key={i} direction="up" in={true} timeout={50}>
            <Grid item xs={12} sm={6} lg={4}>
              <CardProject project={project} />
            </Grid>
          </Slide>
        )) : (
          <EmptyUserCard title={'You have not any project yet.'} />
        )}
      </Grid>

    </Box>
  )
}

export default Project