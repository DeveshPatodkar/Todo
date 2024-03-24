import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUpForm, setShowSignUpForm] = useState(false)
    const navigate = useNavigate();

    const handleShowSignup = () => {
        setShowSignUpForm(!showSignUpForm);
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem("token", response.data);
            navigate("/tasks");
        } catch (error) {
            alert('invalid Login Credentials');
            console.error("Login Error:", error);
        }
    };

    const handleSignup = async () => {
        try {

            const response = await axios.post("http://localhost:8000/signup", {
                email,
                password,
            });
            localStorage.setItem("token", response.data);
            navigate("/tasks");
        } catch (error) {
            alert("Invalid Email or Password(atleast 6 characters)! If you have already signed Up try Logging in")
            console.error("Signup Error:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ marginBottom: '40px', border: '3px solid white', width: '258px', height: '126px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ justifyContent: 'center', alignItems: 'center', width: '236px', height: '104px', color: 'white', fontWeight: '400', border: ' 3px solid #FFFCFC', fontSize: '60px', display: 'flex' }}>Todo</div>
            </div>
            <div style={{ border: '3px solid white', width: '640px', height: '418px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '3px solid white', width: '614px', height: '396px', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="email" style={{ marginRight: '0.5rem', color: 'white', fontSize: '35px', alignSelf: 'flex-end', width: '150px', textAlign: 'end' }}>Email:</label>
                        <input
                            id="email"
                            type="text"
                            placeholder=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottom: '3px solid white', padding: '0.5rem', width: '200px', backgroundColor: 'transparent', color: 'white' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '3rem' }}>
                        <label htmlFor="password" style={{ marginRight: '0.5rem', color: 'white', fontSize: '30px', alignSelf: 'flex-end', width: '150px', textAlign: 'end' }}>{'Password:'}</label>
                        <input
                            id="password"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottom: '3px solid white', padding: '0.5rem', width: '200px', backgroundColor: 'transparent', color: 'white' }}
                        />
                    </div>
                    <button onClick={!showSignUpForm ? handleLogin : handleSignup} style={{ color: 'white', fontWeight: '500', fontSize: '35px', backgroundColor: 'transparent', borderWidth: 0, cursor: 'pointer' }}>{!showSignUpForm ? 'Login' : 'SignUp'}</button>
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <button onClick={handleShowSignup} style={{ color: 'white', fontWeight: '600', fontSize: '20px', backgroundColor: 'transparent', borderWidth: 0, cursor: 'pointer' }}>{!showSignUpForm ? 'new user? sign up' : 'Login'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
