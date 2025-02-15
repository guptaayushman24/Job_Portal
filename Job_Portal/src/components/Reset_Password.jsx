import React, { useState } from 'react'
import './Reset_Password.css'
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faUser,faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';

function Reset_Password() {
  const [hidepassword, sethidepassword] = useState(false);
  const [hideaccountexist, sethideaccountexist] = useState(true);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
   const [currentstate,setcurrentstate] = useState('password');
   const [currentstatereenter,setcurrentstatereenter] = useState('password');
  const navigate = useNavigate();
  const passwordregex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  async function accountexist() {
     // Function to check the account exist or not (Check from the databse)
     if (email.length == 0) {
        alert("Please enter the email address");
        return;
      }
      if (!regex.test(email)){
        alert("Please enter the valid email address");
        return;
      }
  }
  async function changepassword() {
    // Change the password and update on the corresponding user
  }

  function functionpassword(){
    if (currentstate=='password'){
      setcurrentstate('text');
    }
    else if (currentstate=='text'){
      setcurrentstate('password');
    }
  }

  function functionpasswordreenter(){
    if (currentstatereenter=='password'){
      setcurrentstatereenter('text');
    }
    else if (currentstatereenter=='text'){
      setcurrentstatereenter('password');
    }
  }

  return (
    <div>
      <div className='mainrp'>
      {/* Email div*/}
        <div className='emaildetailrp'>
          <div className='emailtxt'>
            Enter email address
          </div>
          <div className='email'>
            <input placeholder='Enter email' type='email' onChange={(e)=>setemail(e.target.value)}></input>
          </div>
        </div>
        {
          hidepassword && (
            <>
               {/* Password div*/}
        <div className='passworddetailrp'>
         <div className='newpasswordrp'>
          Enter new password
         </div>
         <div className='passwordhiderp'>
         <div className='newpasswordrpinput'>
          <input placeholder='Enter new password' type={currentstate} onChange={(e)=>setpassword(e.target.value)}></input>
         </div>

          <div className='passwordhideiconrp'><FontAwesomeIcon icon={faEye} onClick={functionpassword} /></div>
         </div>
         
         
        </div>
        
        {/* Re-enter password*/}
        <div className='passworddetailrp'>
         <div className='newpasswordrp'>
          Re-enter new password
         </div>
         <div className='passwordhiderp'>
         <div className='newpasswordrpinput'>
          <input placeholder='Enter new password' type={currentstatereenter} onChange={(e)=>setpassword(e.target.value)}></input>
         </div>

          <div className='passwordhideiconrp'><FontAwesomeIcon icon={faEye} onClick={functionpasswordreenter} /></div>
         </div>
         
        </div>
            </>
          )
        }
        
      </div>
      
      <div className='buttonstyle'>
      <div className='buttonstylerp'>
        {
          hideaccountexist && (
            <button className='accountexistrp' onClick={accountexist}>Account Exist</button>
          )
        }

        {
          hidepassword && (
            <button className='accountexistrp' onClick={changepassword}>Change Password</button>
          )
        }

      </div>
      </div>

    </div>
  )
}

export default Reset_Password