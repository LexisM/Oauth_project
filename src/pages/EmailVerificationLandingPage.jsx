import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";
import { useToken } from "../auth/useToken";
import { EmailVerificationSuccess } from "./EmailVerifcationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";


export const EmailVerificationLandingPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();

    const [, setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put('http://localhost:5000/api/verify-email', {
                    verificationString
                });
                console.log("repsonse after axios.put : " + response.data);
                console.log(verificationString)

                const { token } = response.data;


                setToken(token);
                setIsSuccess(true);



            } catch (err) {
                console.error("Verification failed", err);
                setIsSuccess(false);

            } finally {
                setIsLoading(false);
            }

        }
        loadVerification();
    }, [setToken, verificationString]);

    if (isLoading) return <p>Loading...</p>
    if (!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess  />

}