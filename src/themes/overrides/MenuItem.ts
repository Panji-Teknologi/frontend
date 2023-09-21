// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - MENU ITEM ||============================== //

export default function MenuItem(theme: Theme) {
    return {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    boxShadow: 0
                },
            }
        }
    };
}
