import { useNavigate } from "react-router-dom"

// material-ui
import { Box, Button, Typography } from "@mui/material"

// assets
import ufo from "../assets/images/ufo.svg"
import AnimateButton from "../components/@extended/AnimateButton"

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ height: '100vh' }}>
            <img src={ufo} alt="Not Found Page" style={{ height: 200 }} />
            <Typography variant="h5" color='secondary' sx={{ mt: 5 }} gutterBottom>
                Sorry, Page is Not Found!
            </Typography>
            <AnimateButton>
                <Button size="small" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </AnimateButton>
        </Box>
    )
}

export default NotFoundPage