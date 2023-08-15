import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material'

// assets
import { DashboardOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';

const Bottommenu = () => {
    const navigate = useNavigate()

    const [value, setValue] = useState<number>(0);

    const handlenavigation = (event: any, value: number) => {
        setValue(value)

        // to dashboard page
        if (value === 0) {
            navigate('/')
        }

        // to history page
        if (value === 1) {
            navigate('/history')
        }

        // to profile page
        if (value === 2) {
            navigate('/profile')
        }
    }

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={handlenavigation}
            >
                {menus.map((menu, i) => (
                    <BottomNavigationAction
                        key={i}
                        label={
                            <Typography variant='subtitle2'>
                                {menu.label}
                            </Typography>
                        }
                        icon={menu.icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    )
}

export default Bottommenu

const menus = [
    {
        label: 'Dashboard',
        icon: <DashboardOutlined style={{ fontSize: 18, marginBottom: 4 }} />
    },
    {
        label: 'History',
        icon: <HistoryOutlined style={{ fontSize: 18, marginBottom: 4 }} />
    },
    {
        label: 'Profile',
        icon: <UserOutlined style={{ fontSize: 18, marginBottom: 4 }} />
    }
]