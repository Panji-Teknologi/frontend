// material-ui
import { Box, Grid, Typography, Stack } from '@mui/material';

// project import
// import AnalyticCard from '../../components/cards/statistics/AnalyticCard';
import MainCard from '../components/MainCard';
import { useAppSelector } from '../store';
import idrFormat from '../utils/idrFormat';
import EmptyUserCard from '../components/cards/EmptyUserCard';
import BarChartContract from '../sections/dashboard/BarChartContract';
import PieChartContract from '../sections/dashboard/PieChartContract';
import FilterBarChart from '../sections/dashboard/FilterBarChart';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Dashboard = () => {
  const { projects } = useAppSelector((state: any) => state.project);
  const { profiles } = useAppSelector((state: any) => state.profile);

  const priceContract: number[] = projects?.map((project: any) => project.total_price_contract);
  const companyNames: string[] = projects?.map((project: any) => project.client_company_name);
  const totalPrice = projects?.reduce((acc: number, curr: any) => acc + curr.total_price_contract, 0);

  return profiles?.is_valid === 1 ? (
    <Grid container spacing={2.5} pb={5}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard title="Total Company Sales" count="Rp 1,420,350,000" color="info" percentage={5.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard title="Total Individual Sales" count="Rp 178,250,000" color="info" percentage={10.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard title="Total Client Orders" count="46" percentage={17.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard title="Total Sales" count="$35,078" percentage={9.9} isLoss color="warning" extra="$20,395" />
      </Grid> */}

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <FilterBarChart />
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                Total Contract Income
              </Typography>
              <Typography variant="h3">{idrFormat(totalPrice)}</Typography>
            </Stack>
          </Box>
          <BarChartContract priceContract={priceContract} companyNames={companyNames} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Contract Overview</Typography>
        </Grid>
        <PieChartContract priceContract={priceContract} companyNames={companyNames} totalPrice={totalPrice} />
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={2.5} pb={5}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <EmptyUserCard title='Your account has not been verified, please contact admin' />
    </Grid>
  )
}

export default Dashboard