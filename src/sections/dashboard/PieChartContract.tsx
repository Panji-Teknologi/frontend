import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// components import
import { useAppSelector } from '../../store';

import MainCard from '../../components/MainCard';
import Dot from '../../components/@extended/Dot';
import idrFormat from '../../utils/idrFormat';

// ==============================|| PIE CHART CONTRACT ||============================== //

interface PieChartContractProps {
  priceContract: number[];
  companyNames: string[];
  totalPrice: number
}

const PieChartContract = ({ priceContract, companyNames, totalPrice }: PieChartContractProps) => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const { projects } = useAppSelector((state: any) => state.project);

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [series, setSeries] = useState<number[]>([]);

  // chart options
  const areaChartOptions = {
    chart: {
      width: 350,
      type: 'donut',
      stacked: false,
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      donut: {
        size: '15%'
      }
    },
    stroke: {
      width: 0
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      }
    ],
    legend: {
      show: false
    }
  };

  const colors = ['warning', 'success', 'error', 'primary']

  useEffect(() => {
    setOptions((prevState: any) => ({
      ...prevState,
      labels: companyNames,
      colors: [theme.palette.warning.main, theme.palette.success.main, theme.palette.error.main, theme.palette.primary.light],
      tooltip: {
        custom: function ({ series, seriesIndex, w }: any) {
          return `<div class="pie_box">
        <span class="PieDot" style='background-color:${w.globals.colors[seriesIndex]}'></span>
        <span class="fontsize">${w.globals.labels[seriesIndex]}${' '}
        <span class="fontsizeValue">${series[seriesIndex]}%</span></span></div>`;
        }
      },
    }));
  }, [primary, secondary, line, theme, companyNames]);

  const [options, setOptions] = useState<any>(areaChartOptions);


  useEffect(() => {
    const toPercent = priceContract.map((item) => {
      const percent = item / totalPrice * 100;
      return Number(percent.toFixed(2));
    })

    setSeries(toPercent)
  }, [priceContract, totalPrice]);

  //sx style
  const DotSize = { display: 'flex', alignItems: 'center', gap: 1 };
  const ExpenseSize = { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 500 };

  return (
    <MainCard
      title="Contract Income Percentage"
      sx={{
        '.pie_box': { padding: 2, display: 'flex', gap: 1, alignItems: 'center', width: '100%' },
        '.PieDot': { width: 12, height: 12, borderRadius: '50%' },
        '.fontsize': { fontWeight: 500, fontSize: '0.875rem', lineHeight: '1.375rem', color: theme.palette.secondary.main },
        '.fontsizeValue': { color: theme.palette.secondary.light },
        mt: 1.5
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} sx={{ '& .apexcharts-canvas': { margin: '0 auto' } }}>
          {companyNames.length === 0 && priceContract.length === 0 ? (
            <Box>
              No Data
            </Box>
          ) : (
            <ReactApexChart options={options} series={series} type="donut" height={downMD ? '100%' : 265} />
          )}
        </Grid>
        <Grid item xs={12}>
          {projects?.map((project: any, i: number) => {
            const percent = project?.total_price_contract / totalPrice * 100;

            return (
              <Grid key={i} container>
                <Grid item></Grid>
                <Grid item xs sx={DotSize}>
                  <Dot color={colors[i]} size={12} />
                  <Typography align="left" variant="subtitle1" color="textSecondary">
                    {project?.client_company_name} ({isNaN(percent) ? 0 : Number(percent.toFixed(2))}%)
                  </Typography>
                </Grid>
                <Grid item sx={ExpenseSize}>
                  {idrFormat(project?.total_price_contract)}
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </MainCard>
  )
}

export default PieChartContract