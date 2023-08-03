// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          &copy; Associate Management By&nbsp;
          <Typography component={Link} variant="subtitle2" href="https://panggilaku.com" target="_blank" underline="hover">
            Panggilaku
          </Typography>
        </Typography>

        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://panggilaku.com"
            target="_blank"
            underline="hover"
          >
            Kebijakan Privasi
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://panggilaku.com/"
            target="_blank"
            underline="hover"
          >
            Dukungan
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
