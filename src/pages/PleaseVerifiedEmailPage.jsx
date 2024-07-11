import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from '@mui/material';


export const PleaseVerifyEmailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, [navigate]);


    return (
        <>
            <h1>   Thanks for signing up</h1>
            <p>Please Verify Email</p>
            <Button onClick={() => navigate("/login")}>Login</Button>
        </>
    );
}