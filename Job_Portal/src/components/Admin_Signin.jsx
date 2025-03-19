import React, { useEffect, useState, useContext ,useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Admin_Signin.css'
function AdminSignin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     const  handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User Data:", {email, password });
        const data = await axios.post('http://localhost:5000/adminsignin',{
            Email:email,
            Password:password
        })
        console.log(data);
        alert("Sigin Successful!");
    };
    return (
       <div className="signin-body">
         <div className="signin-container">
            <h2 className="signin-h2">Signin</h2>
            <form onSubmit={handleSubmit}>

                <div className="signin-input-group">
                    <label className="signin-label">Email</label>
                    <input
                        type="email"
                        className="signin-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="signin-input-group">
                    <label className="signin-label">Password</label>
                    <input
                        type="password"
                        className="signin-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="signin-signupandsigninbuuton">
                    <button type="submit" className="signin-signup-btn" onClick={()=>navigate('/adminsignup')}>Signup</button>
                    <button className="signin-signup-btn" onClick={handleSubmit}>Signin</button>
                </div>

                <div/>
            </form>
        </div>
       </div>
    )
}
export default AdminSignin;
