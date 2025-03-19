import React, { useEffect, useState, useContext ,useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Admin_Signup.css'
function AdminSignup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     const  handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User Data:", { name, email, password });
        const data = await axios.post('http://localhost:5000/adminsignup',{
            Name:name,
            Email:email,
            Password:password
        })
        console.log(data);
        alert("Signup Successful!");
    };
    return (
       <div className="signup-body">
         <div className="signup-container">
    <h2 className="signup-h2">Signup</h2>
    <form onSubmit={handleSubmit}>
        <div className="signup-input-group">
            <label className="signup-label">Name</label>
            <input
                className="signup-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>

        <div className="signup-input-group">
            <label className="signup-label">Email</label>
            <input
                className="signup-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>

        <div className="signup-input-group">
            <label className="signup-label">Password</label>
            <input
                className="signup-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>

        <div className="signup-signupandsigninbuuton">
            <button type="submit" className="signup-btn">Signup</button>
            <button className="signup-btn" onClick={() => navigate('/adminsignin')}>Signin</button>
        </div>
    </form>
</div>
       </div>


    )
}
export default AdminSignup;