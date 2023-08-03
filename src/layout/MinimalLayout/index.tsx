import { Outlet, useLocation } from 'react-router-dom';

// material-ui
import { Box } from '@mui/material';
import Hero from './Hero';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
    const { pathname } = useLocation()

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box component="main" sx={{ width: '100%', flexGrow: 1, }}>
                {pathname === '/' && <Hero />}
                <Outlet />
            </Box>
        </Box>
    )
}

export default MinimalLayout;
