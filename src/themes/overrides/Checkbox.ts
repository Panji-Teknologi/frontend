// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Checkbox(theme: Theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.dark
        }
      }
    }
  };
}
