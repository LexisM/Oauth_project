import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button, TextField } from "@mui/material";

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setIsSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const navigate = useNavigate();

    const onSubmitClicked = async () => {
        try {
            await axios.put(`http://localhost:5000/api/forgot-password/${emailValue}`);

            setIsSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    return success ? (
        <div className="container">
            <h1>Success</h1>
            <p>Check your email for the link to reset your password</p>
        </div>
    ) : (
        <div className="container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we will send you a reset link</p>
            {errorMessage && <div className="bg-red-500 text-white">{errorMessage}</div>}
            <br></br>
            <TextField id="outlined-basic" className='w-[500px]' label="Email" value={emailValue} type='email' onChange={(e) => setEmailValue(e.target.value)} variant="outlined"></TextField>

            <div>
                <Button disabled={!emailValue} onClick={onSubmitClicked}> Send Reset Link</Button>
            </div>


        </div>
    )
}