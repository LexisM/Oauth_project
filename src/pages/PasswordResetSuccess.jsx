import { Button } from "@mui/material";
import { useNavigate } from "react-router"

export const PasswordResetSuccess = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Success</h1>
            <p>
                You Password has been reset.<br />
                You can now log in
            </p>
            <Button variant="contained" className='w-1/2' color='success' onClick={() => navigate('/login')} >
                Back to Sign up.
            </Button>
        </div>
    )
}


