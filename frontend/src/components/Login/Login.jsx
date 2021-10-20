import { useState, useRef } from 'react';
import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';

import axios from 'axios';

import './Login.css';

const Login = (props) => {
    const {
        setShowLogin,
        myStorage,
        setCurrentUser
    } = props;
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        try {
            const loginUser = {
                username: name,
                password,
            };

            const response = await axios.post('/users/login', loginUser);
            myStorage.setItem("user", response.data.username);
            setCurrentUser(response.data.username);
            setShowLogin(false);
            setError(false);
        }
        catch (error) {
            setError(true);
        }
    }

    return (
        <div className="Login">
            <div className="Login-logo">
                <RoomIcon /> <span>Swift Travels</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="Login-button">Login</button>
                {error && <span className="Alerts failure">Something went wrong!</span>}
            </form>
            <CancelIcon
                className="Login-closeButton"
                onClick={() => setShowLogin(false)}
            />
        </div>
    )
}

export default Login
