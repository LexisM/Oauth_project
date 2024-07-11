import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserInfoPage = () => {

    const user = useUser();
    const [token, setToken] = useToken();

    const { id, email, isVerified, info } = user;

    // We'll use the navigate hook to navigate the user
    // programmatically later on (we're not using it yet)
    const navigate = useNavigate();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
    const [hairColor, setHairColor] = useState(info.hairColor || '');
    const [bio, setBio] = useState(info.bio || '');

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        // Send a request to the server to
        // update the user's info with any changes we've
        // made to the text input values
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${id}`, {
                favoriteFood,
                hairColor,
                bio,
            }, {
                headers: { authorization: `Bearer ${token}` }
            });

            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
        } catch (err) {

            console.error("Error saving changes:", err.response?.data?.message || err.message);
            setShowErrorMessage(true);
        }
    }

    const logOut = () => {
        // We'll want to log the user out here
        // and send them to the "login page"
        localStorage.removeItem("token");

        navigate('/login');
    }

    const resetValues = () => {
        // Reset the text input values to
        // their starting values (the data we loaded from the server)
        setFavoriteFood(info.favoriteFood);
        setHairColor(info.hairColor);
        setBio(info.bio);

    }

    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div >
            <h1>Info for {email}</h1>
            {!isVerified && <p className='text-red-500'>Please verify your email</p>}
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we could not save changes</div>}

            <div className='my-2'>

                <TextField id="standard-basic" label="Favorite Food" variant="standard" onChange={e => setFavoriteFood(e.target.value)} value={favoriteFood} />

            </div>
            <div className='my-2'>

                <TextField id="standard-basic" label="Hair color" variant="standard" onChange={e => setHairColor(e.target.value)}
                    value={hairColor} />

            </div>

            <div className='my-2'>
                <TextField id="standard-basic" label="Bio" onChange={e => setBio(e.target.value)}
                    value={bio} />
            </div>

            <hr />
            <div className='my-2'>
                <Button onClick={saveChanges}>Save Changes</Button>

                <Button onClick={resetValues}>Reset Values</Button>
                <Button onClick={logOut}>Log Out</Button>
            </div>

        </div>
    );
}
