import { Button } from "@mui/material";
import { useNavigate } from "react-router"
export const EmailVerificationFail = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Uh oh...</h1>
            <p>
                Somthing went wrong while trying to verify your email.
            </p>
            <Button variant="contained" className='w-1/2' color='success' onClick={() => navigate('/signup')} >
                Back to Sign up.
            </Button>
        </div>
    )
}