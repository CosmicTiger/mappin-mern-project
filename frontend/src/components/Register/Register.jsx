import { useState, useRef } from 'react';
import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';

import axios from 'axios';

import './Register.css';

const Register = (props) => {
    const { setShowRegister } = props;
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const newUser = {
                username: name,
                email,
                password,
            };

            await axios.post('/users/register', newUser);
            setError(false);
            setSuccess(true);
            setShowRegister(false);
        }
        catch (error) {
            setError(true);
        }
    }

    return (
        <div className="Register">
            <div className="Register-logo">
                <RoomIcon /> <span>Swift Travels</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="email" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="Register-button">Register</button>
                {success && <span className="Alerts success">Successfull. You can login now!</span>}
                {error && <span className="Alerts failure">Something went wrong!</span>}
            </form>
            <CancelIcon
                className="Register-closeButton"
                onClick={() => setShowRegister(false)}
            />
        </div>
    )
}

export default Register
