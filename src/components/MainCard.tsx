import { forwardRef, ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  contentSX?: any;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: ReactNode;
  shadow?: string;
  sx?: any;
  title?: string | ReactNode;
  content?: boolean;
  children?: ReactNode
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX,
      darkTitle,
      elevation,
      secondary,
      shadow,
      sx,
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme<any>();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

    return (
      <Card
        component='div'
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          //  maxHeight: 250, minHeight: 250, overflow: "auto",
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
          boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
        )}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
