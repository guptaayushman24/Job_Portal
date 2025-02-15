import axios from "axios";
import React, { useState, useRef, useContext } from 'react'
import './Login.css'

// import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserContext } from "../Context/Context";
import { faBars, faXmark, faUser,faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');
    const displawarning = useRef();
    const invalidemail = useRef();
    const displaypasswordwarning = useRef();
    const invalidpassword = useRef();
    // Context
    const {setuseremail} = useContext(UserContext);
    

    let emailcheck, passwordcheck = false;
    const navigate = useNavigate();
    const [currentstate,setcurrentstate] = useState('password');

    const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordregex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    function googleLogin() {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)

            .then(async (result) => {
                console.log(result);
                if (result.user) {

                    toast.success("User logged in Successfully", {
                        position: 'top-center'
                    });
                }
            })

    }
    async function validateandchceckforuser() {
        // Email Warning
        if (email.length == 0) {
            displawarning.current.style.display = 'block';
            invalidemail.current.style.display = 'none';
        }
        else if (!emailregex.test(email)) {
            displawarning.current.style.display = 'none'
            invalidemail.current.style.display = 'block';
        }
        else {
            displawarning.current.style.display = 'none';
            invalidemail.current.style.display = 'none';
            emailcheck = true;
        }
        // Password Waring
        if (password.length == 0) {
            displaypasswordwarning.current.style.display = 'block';
        }
        else if (!passwordregex.test(password)) {
            displaypasswordwarning.current.style.display = 'none'
            invalidpassword.current.style.display = 'block';
        }
        else {
            invalidpassword.current.style.display = 'none';
            displaypasswordwarning.current.style.display = 'none'
            passwordcheck = true;
        }

        // Navigate to the page where there jobs are showing after verifying the user (DataBase)
        try{
            if (emailcheck==true && passwordcheck==true){
                await axios.post('http://localhost:5000/signin',{
                    EmailAddress:email,
                    Password:password
                })
                setuseremail(email);
                navigate('/alljobs');

            }
        }
        catch(err){
            console.log(err);
        }
    }

    // signup
    function signup(){
        navigate('/signup');
    }
    
    // Reset Password
    function resetpassword(){
        navigate('/resetpassword');
    }
    
    function functionpassword(){
        if (currentstate=='password'){
            setcurrentstate('text');
        }
        else if (currentstate=='text'){
            setcurrentstate('password');
        }
    }
    return (
        <div>
            <div className='parentdiv'>

                <div className='formdiv'>
                    {/* div->heading */}
                    <div className='heading'>
                        <h2>Login</h2>
                    </div>
                    {/* div->Email */}
                    <div className='Email'>
                        <div className='emailheading'>

                            Email address
                        </div>
                        <div>
                            <input type='Email' placeholder='Enter email' className='emailinput' onChange={(e) => Setemail(e.target.value)} ></input>
                        </div>
                        {/* Email Warning*/}
                        <div className='emailwarning' ref={displawarning}>
                            *Please enter the Email
                        </div>
                        <div className='emailwarning' ref={invalidemail}>
                            *Please enter the valid email
                        </div>
                    </div>
                    {/* div->Password */}
                    <div className='Email'>
                        <div className='emailheading'>

                            Password
                        </div>
                        <div className='passwordhide'>

                            <div>
                                <input type={currentstate} placeholder='Enter Password' className='emailinput' onChange={(e) => Setpassword(e.target.value)}></input>


                            </div>
                            <div className='input-container'><FontAwesomeIcon icon={faEye} onClick={functionpassword} />
                            </div>
                        </div>
                        {/* Email Warning*/}
                        <div className='passwordwarning' ref={displaypasswordwarning}>
                            *Please enter the password
                        </div>
                        <div className='passwordwarning' ref={invalidpassword}>
                            *Please enter the strong password
                        </div>

                    </div>
                    {/*div->Submit Button*/}
                    <div className='buttonclass'>
                        <button className='button' onClick={validateandchceckforuser}>Submit</button>
                    </div>
                    {/* Forgot Password*/}
                    <div className='buttonclass'>
                        <button className='button' onClick={resetpassword}>Forget Password</button>
                    </div>
                    {/* div-> NewUser*/}
                    <div className='newUser'>
                        <div>New user
                        </div>
                        <div className='register' onClick={signup}>Register Here
                        </div>
                    </div>
                    {/* continue with*/}
                    <div className='continuewith'>
                        -- Or continue with --
                    </div>

                    <div className='image'>
                        <div className='imagestyle'>
                            <img src='../images/Signinwithgoogle.png' onClick = {googleLogin} className="googlelogo"></img>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;