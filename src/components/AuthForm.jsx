import { useState } from "react";
import PropTypes from "prop-types";
import "./AuthForm.css";

const AuthForm = ({ onSignup, onLogin, message }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoginMode && password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        isLoginMode ? onLogin(email, password) : onSignup(email, password);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="auth-form">
                <h3>{isLoginMode ? "Log in to 447 Mail" : "Create a new account"}</h3>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                {!isLoginMode && (
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Repeat your password"
                        />
                    </div>
                )}
                <button type="submit" className="btn">
                    {isLoginMode ? "Log In" : "Sign Up"}
                </button>
                <p>
                    <a className="link-button" onClick={() => setIsLoginMode(!isLoginMode)}>
                        {isLoginMode ? "Sign up for 447 Mail" : "Already have an account?"}
                    </a>
                </p>

            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

AuthForm.propTypes = {
    onSignup: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    message: PropTypes.string,
};

export default AuthForm;