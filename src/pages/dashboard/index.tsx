
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import AnalyticCard from '../../components/cards/statistics/AnalyticCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Dashboard = () => {
    return (
        <Grid container spacing={2.5} pb={5}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    )
}

export default Dashboard