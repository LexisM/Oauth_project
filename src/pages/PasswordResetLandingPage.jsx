import { useState } from "react";
import { useParams } from "react-router";
import { Button, TextField } from "@mui/material";

import axios from "axios";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFailure } from "./PasswordResetFailure";

export const PasswordResetLandingPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const { passwordResetCode } = useParams();

    const onResetClick = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users/${passwordResetCode}/reset-password`, { newPassword: passwordValue });
            setIsSuccess(true);
        } catch (err) {
            setIsFailure(true);
        }
    }

    if (isSuccess) return <PasswordResetSuccess />
    if (isFailure) return <PasswordResetFailure />

    return (
        <div className="container">
            <h1>Reset Password</h1>
            <p>Please enter a new password</p>

            <div>
                <TextField id="outlined-basic" type='password' className='w-[500px] ' label="Password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} variant="outlined"></TextField>
            </div>
            <div className='my-2'>
                <TextField id="outlined-basic" type='password' className='w-[500px] ' label="Confirm Password" value={confirmPasswordValue} onChange={(e) => setConfirmPasswordValue(e.target.value)} variant="outlined"></TextField>
            </div>
            <div className='my-2' >
                <Button variant="contained" disabled={
                    !passwordValue || !confirmPasswordValue ||
                    passwordValue !== confirmPasswordValue} className='w-1/2' onClick={onResetClick}>
                    Reset Password
                </Button>
            </div >
        </div>
    )

}