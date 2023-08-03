import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import Logo from './Logo';
import config from '../../config';
import { activeItem } from '../../store/reducers/menu';

interface LogoSectionProps {
  sx?: any
  to?: string
};

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }: LogoSectionProps) => {
  const { defaultId } = useSelector((state: any) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
