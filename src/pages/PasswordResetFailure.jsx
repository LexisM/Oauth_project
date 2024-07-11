import { Button } from "@mui/material";
import { useNavigate } from "react-router"

export const PasswordResetFailure = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while trying to reset your password.<br />
                Please try again.
            </p>
            <Button variant="contained" className='w-1/2' color='success' onClick={() => navigate('/login')} >
                Back to Sign up.
            </Button>
        </div>
    )
}


