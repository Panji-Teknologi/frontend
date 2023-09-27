import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';


// ==============================|| BAR CHART CONTRACT ||============================== //

interface BarChartContractProps {
	priceContract: number[];
	companyNames: string[]
}

const BarChartContract = ({ priceContract, companyNames }: BarChartContractProps) => {
	const theme = useTheme();

	const { primary, secondary } = theme.palette;
	const info = theme.palette.info.light;

	const [series, setSeries] = useState([
		{
			data: priceContract
		}
	]);


	// chart options
	const barChartOptions = {
		chart: {
			type: 'bar',
			height: 365,
			toolbar: {
				show: false
			}
		},
		plotOptions: {
			bar: {
				columnWidth: '45%',
				borderRadius: 4
			}
		},
		dataLabels: {
			enabled: false
		},
		xaxis: {
			categories: companyNames,
		},
		yaxis: {
			show: false
		},
		grid: {
			show: false
		}
	};

	const [options, setOptions] = useState<any>(barChartOptions);

	useEffect(() => {
		setOptions((prevState: any) => ({
			...prevState,
			colors: [info],
			xaxis: {
				labels: {
					style: {
						colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
					}
				},
				categories: companyNames,
			},
		}));
	}, [primary, info, secondary, companyNames]);

	useEffect(() => {
		setSeries([
			{
				data: priceContract
			}
		]);
	}, [priceContract]);

	return (
		<Box id="chart" sx={{ bgcolor: 'transparent' }}>
			{companyNames.length === 0 && priceContract.length === 0 ? (
				<Box>
					No Data
				</Box>
			) : (
				<ReactApexChart options={options} series={series} type="bar" height={365} />
			)}
		</Box>
	)
}

export default BarChartContract