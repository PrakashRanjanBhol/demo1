import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (email) {
            localStorage.setItem("user", email);
            navigate("/login");
        }
    };

    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
