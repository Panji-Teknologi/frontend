import { useState } from "react";

// third-party
import dayjs from 'dayjs';

// material ui
import { Grid, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// project import
import useCookie from "../../hooks/useCookie";

import { useAppDispatch } from "../../store";
import { getProjectByAssociate } from "../../store/actions/project";
import { getUserIdFromToken } from "../../utils/decode-token";

const FilterBarChart = () => {
  const dispatch = useAppDispatch();

  const [token] = useCookie('_auth');
  const tokenUserId = getUserIdFromToken(token);

  const [value, setValue] = useState<Date>(new Date());

  const handleChange = (newValue: any) => {
    // console.log("DATE yr : ", newValue.$d)
    const year = String(newValue?.$y);

    dispatch(getProjectByAssociate({ token, tokenUserId, year }))
    setValue(newValue);
  };

  return (
    <Grid item display='flex' alignItems='center' justifyContent='space-between'>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>Contract Overview</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker value={dayjs(value)} views={['year']} onChange={handleChange} />
      </LocalizationProvider>
    </Grid>
  )
}

export default FilterBarChart