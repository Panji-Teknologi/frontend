
// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme: Theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          fontWeight: 400
        },
        contained: {
          ...disabledStyle
        },
        outlined: {
          ...disabledStyle
        }
      }
    }
  };
}
