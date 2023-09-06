import { useNavigate } from "react-router-dom";

// material ui
import { Button } from "@mui/material";

// assets
import { LeftOutlined } from '@ant-design/icons';

const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <Button startIcon={<LeftOutlined />} variant="outlined" size="small" onClick={() => navigate(-1)}>
      Back
    </Button>
  )
}

export default ButtonBack