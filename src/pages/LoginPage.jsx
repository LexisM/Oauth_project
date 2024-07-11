import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useQueryParams } from '../utils/useQueryParams';



export const LogInPage = () => {
    const [, setToken] = useToken();
    const [errorMessage] = useState(""); // [errorMessage]
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            navigate('/');
        }
    }, [oauthToken, setToken, navigate]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/google/url');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                console.log(e);
            }


        }
        loadOauthUrl();
    }, [])

    const onLogInClicked = async () => {
        const response = await axios.post('http://localhost:5000/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        navigate('/');
    }



    return (
        <>
            <h1>Log In</h1>
            {errorMessage && <div className='bg-red-500'>{errorMessage}</div>}
            <div className="card">
                <form action="">
                    <div >
                        <TextField id="outlined-basic" className='w-[500px]' label="Email" value={emailValue} type='email' onChange={(e) => setEmailValue(e.target.value)} variant="outlined"></TextField>
                    </div>
                    <br></br>
                    <div>
                        <TextField id="outlined-basic" type='password' className='w-[500px] ' label="Password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} variant="outlined"></TextField>
                    </div>
                    <div className='my-2 flex gap-4' >
                        <Button variant="contained" color='secondary' disabled={!emailValue
                            || !passwordValue} className='w-1/2 ' onClick={onLogInClicked}>
                            Log In
                        </Button>

                        <Button variant="contained" color='secondary' className='w-1/2 ' onClick={() => navigate('/forgot-password')}>
                            Forgot Password
                        </Button>

                    </div >

                    <h2 className='my-4' >Or log in with:</h2>
                    <div className='my-2' >
                        <Button variant="contained" disabled={!googleOauthUrl} onClick={() => window.location.href = googleOauthUrl} className='w-1/2'>
                            Google
                        </Button>
                    </div >

                    <div className='my-2' >
                        <Button variant="contained" className='w-1/2'>
                            Facebook
                        </Button>
                    </div>
                    <div className='my-2' >
                        <Button variant="contained" className='w-1/2'   >
                            GitHub
                        </Button>
                    </div>
                </form>
                <hr className='my-4' />
                <div>
                    <p>Do you not have an account?</p>
                    <Button variant="contained" className='w-1/2' color='success' onClick={() => navigate('/signup')} >
                        Sing up
                    </Button>
                </div>
            </div>

        </>
    )
}

