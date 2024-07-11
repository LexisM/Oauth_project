import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useToken } from '../auth/useToken';



export const SignUpPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState(""); // [errorMessage]
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    /**
     * useNavigate hook is used to navigate programmatically
     */
    const navigate = useNavigate();


    //Handling sign up
    const onSignUpClicked = async () => {
        const response = await axios.post('http://localhost:5000/api/signup', {
            email: emailValue,
            password: passwordValue
        })
        console.log(response);

        const { token } = response.data;
        setToken(token);
        navigate('/');
    }



    return (
        <>
            <h1>Sing Up</h1>
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
                    <div className='my-2'>
                        <TextField id="outlined-basic" type='password' className='w-[500px] ' label="Confirm Password" value={confirmPasswordValue} onChange={(e) => setConfirmPasswordValue(e.target.value)} variant="outlined"></TextField>
                    </div>

                    <div className='my-2' >
                        <Button variant="contained" disabled={
                            !emailValue || !passwordValue ||
                            passwordValue !== confirmPasswordValue} className='w-1/2' onClick={onSignUpClicked}>
                            Sing up
                        </Button>
                    </div >


                    <h2 className='my-4' >Or sign up with:</h2>
                    <div className='my-2' >
                        <Button variant="contained" className='w-1/2'>
                            Google
                        </Button>
                    </div >

                    <div className='my-2' >
                        <Button variant="contained" className='w-1/2'>
                            Facebook
                        </Button>
                    </div>
                    <div className='my-2' >
                        <Button variant="contained" className='w-1/2'  >
                            GitHub
                        </Button>
                    </div>

                </form>

                <hr className='my-4' />
                <div>
                    <p>Already have an account?</p>
                    <Button variant="contained" className='w-1/2' color='success' onClick={() => navigate('/login')} >
                        Log In
                    </Button>
                </div>
            </div>

        </>
    )
}

