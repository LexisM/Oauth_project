import { Button } from "@mui/material";
import { useNavigate } from "react-router"


export const EmailVerificationSuccess = () => {
    const navigate = useNavigate();


    return (
        <div>
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email.
            </p>
            <Button variant="contained" className='w-full' color='success' onClick={() => navigate('/')} >
                Go to home page.
            </Button>
        </div>
    )

}