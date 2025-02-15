import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing_Page.css'
function Landing_Page() {
    const navigate = useNavigate();
    function loginpage(){
        navigate('/signin');
    }
    function signuppage(){
        navigate('/signup');
    }
    return (
        <>
            <div className='Parentdiv'>
                <div className='Header'>
                    <div className='websitename'> AI Powered Job Portal</div>
                    
                        <button className='post-job-btn'>Post Job</button>
                    
                    <div className='subheader'>
                    <div className='websitename'>
                        <button onClick={loginpage}>LogIN</button>
                    </div>
                    <div className='websitename'>
                       <button onClick={signuppage}>Register</button>
                    </div>
                    </div>
                </div>
                <div className='Midpage'>
                    <div className='title'>
                        Find Your <br></br><span className='highlight'>Dream Job Or Internship</span>
                    </div>
                    <div className='logo'>
                     <img src='../images/Job_seeker_logo.jpg'></img>
                    </div>
                </div>
                <div className='Footer'>
                    <div className='active_workers'>
                        <div className='number'>586K+</div>
                        <div className='text'>Active Workers</div>

                    </div>
                    <div className='active_workers'>
                        <div className='number'>586K+</div>
                        <div className='text'>Companies</div>
                    </div>
                    <div className='active_workers'>
                        <div className='number'>586K+</div>
                        <div className='text'>Countries</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Landing_Page;